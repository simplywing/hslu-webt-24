<?php

error_reporting(0);
$METHOD = $_SERVER['REQUEST_METHOD'];
header('Content-Type: application/json');

// User Identification Cookie

if (!isset($_COOKIE['user'])) {
    $unique_id = uniqid();
    setcookie('user', $unique_id);
    $_COOKIE['user'] = $unique_id;
} 

// Functions

function connect_db()
{
    mysqli_report(MYSQLI_REPORT_OFF);
    $conn = mysqli_connect("localhost", "root", "ruth", "thermikjunkies");
    if (!$conn) {
        send_terminating_error('Error occured while connecting to the database', 500);
    }
    return $conn;
}

function disconnect_db($connection)
{
    mysqli_close($connection);
}

function validate_name($name)
{
    return strlen($name) > 3;
}

function validate_email($email)
{
    return preg_match('/\S+@\S+\.\S+/', $email) === 1;
}

function validate_shvnum($shvnum)
{
    return is_numeric($shvnum) && intval($shvnum) > 0;
}

function validate_birthdate($birthdate)
{
    $format = 'Y-m-d';
    $date_now = date('Y-m-d');
    $dt = DateTime::createFromFormat($format, $birthdate);
    return $dt && $dt->format($format) == $birthdate && $birthdate < $date_now;
}

function send_terminating_error($message, $code)
{
    http_response_code($code);
    echo json_encode(['error' => ['message' => $message, 'code' => $code]]);
    die();
}

function get_members($conn){
    $query = "SELECT uname as name, email, shvNum, birthdate, entryDate, createdBy FROM members ORDER BY entryDate ASC";
    $stmt = mysqli_prepare($conn, $query);
    $res = mysqli_stmt_execute($stmt);
    if (!$res) {
        send_terminating_error('Error occured during execution ', 500);
    }

    $members = mysqli_stmt_get_result($stmt);
    return mysqli_fetch_all($members, MYSQLI_ASSOC);
}

function add_member($conn, $name, $email, $shvNum, $birthdate){
    $query = "INSERT INTO members (id, uname, email, shvNum, birthdate, entryDate, createdBy) VALUES (NULL, ?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, 'ssssss' , $name, $email, $shvNum, $birthdate, date('Y-m-d'), $_COOKIE['user']);
    $res = mysqli_stmt_execute($stmt);
    if (!$res) {
        $mysqli_error = mysqli_stmt_error($stmt);
        str_contains($mysqli_error, 'Duplicate entry') ? send_terminating_error('Member with the email address "' . $email . '" already exists', 409) :
        send_terminating_error('Error occured during execution: ' . $mysqli_error, 500);
    }
}

function delete_member($conn, $email){
    $query = "DELETE FROM members WHERE email = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, 's' , $email);
    $res = mysqli_stmt_execute($stmt);
    if (!$res) {
        $mysqli_error = mysqli_stmt_error($stmt);
        send_terminating_error('Error occured during execution: ' . $mysqli_error, 500);
    }
}

// Routing

if (isset($_GET['_url']) && $METHOD == 'GET' && $_GET['_url'] == '/api/v1/members') {
    
    $conn = connect_db();
    $members = get_members($conn);
    disconnect_db($conn);

    http_response_code(200);
    echo json_encode($members);

} elseif (isset($_GET['_url']) && $METHOD == 'POST' && $_GET['_url'] == '/api/v1/members') {

    $body = file_get_contents("php://input");
    $request = json_decode($body, true);

    $illegal_fields = [];
    validate_name($request['name'])             ?: array_push($illegal_fields, 'name');
    validate_email($request['email'])           ?: array_push($illegal_fields, 'email');
    validate_shvnum($request['shvNum'])         ?: array_push($illegal_fields, 'shvNum');
    validate_birthdate($request['birthdate'])   ?: array_push($illegal_fields, 'birthdate');

    if (sizeof($illegal_fields) > 0) {
        send_terminating_error('Input contains invalid data, affected fields: ' . implode(', ', $illegal_fields), 400);
    }

    $conn = connect_db();
    add_member($conn, $request['name'], $request['email'], $request['shvNum'], $request['birthdate']);
    $members = get_members($conn);
    disconnect_db($conn);

    echo json_encode($members);
    http_response_code(201);

} elseif (isset($_GET['_url']) && $METHOD == 'DELETE' && $_GET['_url'] == '/api/v1/members') {

    $body = file_get_contents("php://input");
    $request = json_decode($body, true);

    $illegal_fields = [];
    validate_email($request['email']) ?: array_push($illegal_fields, 'email');

    if (sizeof($illegal_fields) > 0) {
        send_terminating_error('Input contains invalid data, affected fields: ' . implode(', ', $illegal_fields), 400);
    }

    $conn = connect_db();
    delete_member($conn, $request['email']);
    disconnect_db($conn);

    http_response_code(200);
} else {
    send_terminating_error('Resource not found', 404);
}
