
// socket io 
var socket = io("http://localhost:3000");
var dateCreate;
var temp = 0;

socket.on('data-chart', (data) => {
    console.log(data);
});

socket.on('change-data', (data) => {
    dateCreate = data.date_created;
    temp = data.temp;
});

// Chart
var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

function randomScalingFactor() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

function onRefresh(chart) {
    console.log(dateCreate + temp);

    chart.config.data.datasets.forEach(function (dataset) {
        dataset.data.push({
            x: dateCreate,
            y: temp
        });
    });
}

var color = Chart.helpers.color;
var config = {
    type: 'line',
    data: {
        datasets: [{
            label: 'Temp 1 (linear interpolation)',
            backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
            borderColor: chartColors.red,
            fill: false,
            lineTension: 0,
            borderDash: [8, 4],
            data: []
        }, {
            label: 'Temp 2 (cubic interpolation)',
            backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
            borderColor: chartColors.blue,
            fill: false,
            cubicInterpolationMode: 'monotone',
            data: []
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Line chart - temperature (hotizontal scroll)'
        },
        scales: {
            xAxes: [{
                type: 'realtime',
                realtime: {
                    duration: 10000,
                    refresh: 1000,
                    delay: 1000,
                    onRefresh: onRefresh
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Temperature'
                }
            }]
        },
        tooltips: {
            mode: 'nearest',
            intersect: false
        },
        hover: {
            mode: 'nearest',
            intersect: false
        }
    }
};

window.onload = function () {
    var ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, config);
};

// document.getElementById('randomizeData').addEventListener('click', function () {
//     config.data.datasets.forEach(function (dataset) {
//         dataset.data.forEach(function (dataObj) {
//             dataObj.y = randomScalingFactor();
//         });
//     });
//     window.myChart.update();
// });

// var colorNames = Object.keys(chartColors);
// document.getElementById('addDataset').addEventListener('click', function () {
//     var colorName = colorNames[config.data.datasets.length % colorNames.length];
//     var newColor = chartColors[colorName];
//     var newDataset = {
//         label: 'Dataset ' + (config.data.datasets.length + 1),
//         backgroundColor: color(newColor).alpha(0.5).rgbString(),
//         borderColor: newColor,
//         fill: false,
//         lineTension: 0,
//         data: []
//     };

//     config.data.datasets.push(newDataset);
//     window.myChart.update();
// });

// document.getElementById('removeDataset').addEventListener('click', function () {
//     config.data.datasets.pop();
//     window.myChart.update();
// });

// document.getElementById('addData').addEventListener('click', function () {
//     onRefresh(window.myChart);
//     window.myChart.update();
// });
