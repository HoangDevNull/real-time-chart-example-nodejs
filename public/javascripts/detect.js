
navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);
const video = document.querySelector('#video');
const socket = io('http://localhost:3000');



let init = () => {
    if (navigator.getUserMedia) {
        const webcamPromise = navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                facingMode: 'environment'
            },
            peerIdentity: null
        })
            .then((stream) => {
                video.srcObject = stream;
                return new Promise(resolve => {
                    video.onloadedmetadata = () => {
                        resolve();
                    }
                });
            }, (err) => {
                console.log('could not start webcam');
                console.log(err);
            });

        const modelPromise = cocoSsd.load('lite_mobilenet_v2');

        Promise.all([modelPromise, webcamPromise])
            .then(values => {
                console.log('init video finish');
                video.play();
                detectFrame(this.video, values[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

let detectFrame = (video, model) => {
    model.detect(video).then(predictions => {
        renderPredictions(predictions);
        requestAnimationFrame(() => {
            detectFrame(video, model);
        });
    });
}

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let renderPredictions = (predictions) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const font = "24px helvetica";
    ctx.font = font;
    ctx.textBaseline = "top";

    predictions.forEach(prediction => {
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        const width = prediction.bbox[2];
        const height = prediction.bbox[3];
        // Draw the bounding box.
        ctx.strokeStyle = "#2fff00";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, width, height);
        // Draw the label background.
        ctx.fillStyle = "#2fff00";
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font, 10);
        // draw top left rectangle
        ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
        // draw bottom left rectangle
        ctx.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10);

        // Draw the text last to ensure it's on top.
        ctx.fillStyle = "#000000";
        ctx.fillText(prediction.class, x, y);
        ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);
        if (prediction.class == "person" && Number(prediction.score.toFixed(2)) >= 0.8) {
            console.log('person');
        }
    });
}

init();