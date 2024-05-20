<?php

// TODO: Implement REST API for members
// TODO: Error Handling
// TODO: Implement POST, DELETE

if(isset($_GET['_url']) && $_GET['_url'] == '/api/v1/members') {
    header('Content-Type: application/json');
    $conn = mysqli_connect("localhost", "root", "ruth", "thermikjunkies");
    $query = "select uname as name, email, shvNum, birthdate, entryDate from members order by entryDate asc";
    $stmt = mysqli_prepare($conn, $query);
    $res = mysqli_stmt_execute($stmt);
    
    $members = mysqli_stmt_get_result($stmt);
    $membersAssoc = mysqli_fetch_all($members, MYSQLI_ASSOC);
    
    mysqli_close($conn);
    
    echo json_encode($membersAssoc);    
}
else {
    //send 404 status code
    http_response_code(404);
    die();
}




?>