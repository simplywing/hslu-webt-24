<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WEBT Dashboard</title>
    <style>
        body {
            font-family: sans-serif;
        }

        .strike-trough {
            text-decoration: line-through;
        }
    </style>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="/live.js"></script>
</head>

<body>
    <div class="container col-xxl-8 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div class="col-10 col-sm-8 col-lg-6">
                <img src="https://hub.hslu.ch/informatik/wp-content/blogs.dir/632/files/sites/3/Titelbild-Immersive-Realities-Bachelor-Augmented-Virtual-Reality_en.jpg" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
            </div>
            <div class="col-lg-6">
                <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Hello <span class="strike-trough">World</span> WEBT!</h1>
                <p class="lead">Code samples created during the WEBT module at HSLU. <br>This page is served from:<br><?php echo dirname(__FILE__); ?></p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                    <a href="https://github.com/simplywing/hslu-webt-24"><button type="button" class="btn btn-primary btn-lg px-4 me-md-2">GitHub</button></a>
                    <div class="dropdown">
                        <button class="btn btn-outline-secondary dropdown-toggle btn-lg px-4 me-md-2" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            samples
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><a class="dropdown-item" href="phpinfo.php">phpinfo</a></li>
                            <li><a class="dropdown-item" href="geolocation">Geolocation API</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</html>