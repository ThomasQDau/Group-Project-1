// MOBILE NAVIGATION
//TODO: Copy paste to other js
$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.step2').hide();
    $('.step3').hide();
});
var database = firebase.database();

// var photoElem = $('<div>');

// var stepsElem = $('<p>');
// stepsElem.addClass('main-text');



// LOCAL STORAGE //
$('.next1').on('click', function () {
    $('.step1').hide();
    $('.step2').show();

    event.preventDefault();

    var firstName = $("#first_name").val().trim();
    var lastName = $("#last_name").val().trim();
    var email = $("#email").val().trim();

    localStorage.clear();
    localStorage.setItem("Full Name", firstName + lastName);
    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Email", email);

})

$('.next2').on('click', function () {
    event.preventDefault();
    $('.step2').hide();
    $('.step3').show();

    $('#namedisplay').text('Name: ' + localStorage.getItem("First Name") + ' ' + localStorage.getItem("Last Name"));
    $('#emaildisplay').text('Email: ' + localStorage.getItem("Email"));
})


$('#video').on('click', function () {

    // Grab elements, create settings, etc.
    var video = document.getElementById('video');

    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
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
    document.getElementById("snap").addEventListener("click", function () {
        context.drawImage(video, 0, 0, 640, 480);
    });
})

$('.upward').on('click', function() {
    var fullName = localStorage.getItem('Full Name');
    database.ref(fullName).set({
        firstname: localStorage.getItem('First Name'),
        lastname: localStorage.getItem('Last Name'),
        picture: localStorage.getItem('Picture'),
        email: localStorage.getItem('Email')
    })
})
