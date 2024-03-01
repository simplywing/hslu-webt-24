<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test-Page!</title>
    <style>
        body{
            font-family: sans-serif;
        }
        .strike-trough {
            text-decoration:line-through;
        }
    </style>
    <script src="live.js"></script>
</head>
<body>
    <h1>Hello <span class="strike-trough">World</span> WEBT!</h1>
    <a href="phpinfo.php">Click here for phpinfo()</a>

    <p>This page is served from <pre><?php echo dirname(__FILE__); ?></pre></p>
</body>
</html>