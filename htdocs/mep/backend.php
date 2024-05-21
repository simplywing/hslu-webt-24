<?php

// TODO: Error Handling
// TODO: Implement POST, DELETE
// TODO: Implement Cookie

error_reporting(-1);
$METHOD = $_SERVER['REQUEST_METHOD'];
header('Content-Type: application/json');

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

if (isset($_GET['_url']) && $METHOD == 'GET' && $_GET['_url'] == '/api/v1/members') {
    $conn = connect_db();

    $query = "SELECT uname as name, email, shvNum, birthdate, entryDate FROM members ORDER BY entryDate ASC";
    $stmt = mysqli_prepare($conn, $query);
    $res = mysqli_stmt_execute($stmt);
    if (!$res) {
        send_terminating_error('Error occured during execution', 500);
    }

    $members = mysqli_stmt_get_result($stmt);
    $membersAssoc = mysqli_fetch_all($members, MYSQLI_ASSOC);

    disconnect_db($conn);
    echo json_encode($membersAssoc);
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

    $entry_date = date('Y-m-d');
    $conn = connect_db();
    $query = "INSERT INTO members (id, uname, email, shvNum, birthdate, entryDate) VALUES (NULL, ?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, 'sssss' , $request['name'], $request['email'], $request['shvNum'], $request['birthdate'], $entry_date);
    $res = mysqli_stmt_execute($stmt);
    disconnect_db($conn);
    if (!$res) {
        send_terminating_error('Error occured during execution', 500);
    }
} else {
    send_terminating_error('Resource not found', 404);
}
