song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rigthWristY = 0;

leftWristScore = 0;
rightWristScore = 0;
song1_status = "";
song2_status = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(500, 500);
    //canvas.center();
    canvas.position(450, 250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResult);
}

function draw() {
    image(video, 0, 0, 500, 500);
    //song2.play();

    fill("#FF0000");
    stroke("FF0000");

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    console.log("song1_status = " + song1_status + " song2_status = " + song2_status);

    if (leftWristScore >= 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if (song1_status == false) {
            song1.play();
            document.getElementById("song").innerHTML = "Playing : Harry Potter Song";
        }
    }

    if (rightWristScore > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if (song2_status == false) {
            song2.play();
            document.getElementById("song").innerHTML = "Playing : Peter Pan Song";
        }
    }

}

function modelLoaded() {
    console.log("PoseNet Model is Initialized !");
}

function gotResult(results) {
    console.log(results);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX: " + leftWristX + " leftWristY: " + leftWristY)

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX: " + rightWristX + "rightWristY: " + rightWristY);

    leftWristScore = results[0].pose.keypoints[9].score;
    rightWristScore = results[0].pose.keypoints[10].score;
    console.log("Left Wrist score : ", leftWristScore + " Right Wrist score : ", rightWristScore);

}