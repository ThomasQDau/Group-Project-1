// MOBILE NAVIGATION
$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.step2').hide();
    $('.step3').hide();
});
var database = firebase.database();

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
    $('#my_result').appendTo('#webimg')
    $('#namedisplay').text('Name: ' + localStorage.getItem("First Name") + ' ' + localStorage.getItem("Last Name"));
    $('#emaildisplay').text('Email: ' + localStorage.getItem("Email"));
})



//Uploads data and picture to Firebase
$('.upward').on('click', function () {
    var idnumber = '';
    function idGenerator() {
        idnumber = '';
        for (var i = 0; i < 10; i++) {
            idnumber = idnumber + Math.floor(Math.random() * 10);
        };
        database.ref().once('value', function (data) {
            if (data.hasChild(idnumber)) {
                idGenerator();
                console.log(idnumber);
                console.log(data.child);
            } else {
                $('#idDisplay').text('Your ID # is: ' + idnumber);
                //here
                database.ref(idnumber).set({
                    firstname: localStorage.getItem('First Name'),
                    lastname: localStorage.getItem('Last Name'),
                    picture: img,
                    email: localStorage.getItem('Email'),
                    galleryid: 'uci'
                })
                $('.confirm').text('Application Sent!')
            }
        })
    }
    idGenerator();
})

//Webcam application
Webcam.attach('#my_camera');
var img = null;
function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById('my_result').innerHTML = '<img align="middle" src="' + data_uri + '"/>';
        img = data_uri
    });
}
