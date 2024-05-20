function updateStatsCanvas(){
    let cvs = document.getElementById("stats-canvas");
    updateCanvasSize(cvs);
    let ctx = cvs.getContext("2d");
    let width = cvs.width;
    let height = cvs.height;

    //clear canvas
    ctx.clearRect(0, 0, width, height);

    //draw horizontal axis (years, date of entry)
    ctx.beginPath();
    ctx.moveTo(0, height - 20);
    ctx.lineTo(width, height - 20);
    ctx.stroke();

    //draw vertical axis (age)
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(20, height);
    ctx.stroke();

    //draw data points
    let data = [
        {year: 2014, members: 3},
        {year: 2015, members: 12},
        {year: 2016, members: 21},
        {year: 2017, members: 23},
        {year: 2018, members: 21},
        {year: 2019, members: 25},
        {year: 2020, members: 31},
        {year: 2021, members: 31},
        {year: 2022, members: 36},
        {year: 2023, members: 42},
        {year: 2024, members: 40}
    ];
    let x0 = 20;
    let y0 = height - 20;
    let x1 = width;
    let y1 = 0;
    let dx = x1 - x0;
    let dy = y0 - y1;
    let xMin = 2013;
    let xMax = 2025;
    let yMin = 0;
    let yMax = 45;
    let xScale = dx / (xMax - xMin);
    let yScale = dy / (yMax - yMin);
    ctx.beginPath();
    ctx.moveTo(x0 + (data[0].year - xMin) * xScale, y0 - (data[0].members - yMin) * yScale);
    for(let i = 1; i < data.length; i++){
        ctx.lineTo(x0 + (data[i].year - xMin) * xScale, y0 - (data[i].members - yMin) * yScale);
    }
    ctx.stroke();
    for(let i = 0; i < data.length; i++){
        ctx.beginPath();
        ctx.arc(x0 + (data[i].year - xMin) * xScale, y0 - (data[i].members - yMin) * yScale, 3, 0, 2 * Math.PI);
        ctx.fill();
    }
    //draw labels
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for(let i = 0; i < data.length; i++){
        ctx.fillText(data[i].year, x0 + (data[i].year - xMin) * xScale, y0 + 5);
    }
    ctx.textBaseline = "middle";
    for(let i = 0; i < data.length; i++){
        ctx.fillText(data[i].members, x0 + (data[i].year - xMin) * xScale, (y0 - (data[i].members - yMin) * yScale) + -10);
    }

    //label the y-axis
    ctx.save();
    ctx.translate(7, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Mitglieder", 0, 0);
    ctx.restore();

}

function updateCanvasSize(cvs){
    cvs.style.width ='100%';    
    cvs.style.height='600';
    cvs.width  = cvs.offsetWidth;
    cvs.height = cvs.offsetHeight;
}

document.addEventListener("DOMContentLoaded", function(){
    updateStatsCanvas();
});