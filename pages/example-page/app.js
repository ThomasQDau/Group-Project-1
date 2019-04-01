// MOBILE NAVIGATION
//TODO: Copy paste to other js
$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.step2').hide();
});

// var photoElem = $('<div>');

// var stepsElem = $('<p>');
// stepsElem.addClass('main-text');

$('.next').on('click', function () {
    $('.step1').hide();
    $('.step2').show();
})



$('#video').on('click', function () {

// Grab elements, create settings, etc.
var video = document.getElementById('video');

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    });
}

// Elements for taking the snapshot
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');

// Trigger photo take
document.getElementById("snap").addEventListener("click", function() {
	context.drawImage(video, 0, 0, 640, 480);
});


})

