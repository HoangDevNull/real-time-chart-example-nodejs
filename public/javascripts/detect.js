navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);
const video = document.querySelector('#video');

let initWebcam = () => {
    if (navigator.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                facingMode: 'environment'
            },
            peerIdentity: null
        }).then((stream) => {
            video.srcObject = stream;
            video.onloadedmetadata = () => {
                video.play();
            }
        })
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

let predictWithCoco = async () => {
    const model = await cocoSsd.load('lite_mobilenet_v2');
    detectFrame(this.video, model);
    console.log('model loaded');
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
    });
}

initWebcam();
predictWithCoco();