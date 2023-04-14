img = "";
objects = [];
statuss = "";

function preload(){
    img = loadImage("dog_cat.jpg");
}
function setup(){
    canvas = createCanvas(450, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Object Detecting";
}
function modelLoaded(){
    console.log("modelLoaded!");
    statuss = true;
}
function gotResult(error, results)
{
    if(error) {
        console.log(error);
    } 
     console.log(results);
     objects = results;
}
function draw(){
    image(video, 0, 0, 450, 400);
    
    if(statuss != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status - Object Dectected";
            document.getElementById("number_of_objects").innerHTML = "The number of objects detected are" + objects.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 20, objects[i].y + 25);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x + 15, objects[i].y + 15, objects[i].width, objects[i].height);
        }
    }
}