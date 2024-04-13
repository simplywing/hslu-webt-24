function getLocation() {
    console.log("getLocation called!");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showPositionError);
    }
}

function showPosition(position) {
    document.getElementById('lat-out').innerText = position.coords.latitude;
    document.getElementById('lon-out').innerText = position.coords.longitude;
}

function showPositionError(error){
    let errText = "";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errText = "PERMISSION_DENIED";
            break;
        case error.POSITION_UNAVAILABLE:
            errText = "POSITION_UNAVAILABLE";
            break;      
        case error.TIMEOUT:
            errText = "TIMEOUT";
            break;      
        default:
            errText = "UNKNOWN: " + error.code;
            break;
    }

    alert("Error getting location! " + errText);

}