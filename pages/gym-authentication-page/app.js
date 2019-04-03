// MOBILE NAVIGATION
$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.step1').show();
    $('.step2').hide();
    $('.stepfail').hide();
    $('.steppass').hide();
});

var database = firebase.database();
var idNumber = '';

$('.next1').on('click', function () {
    $('.step1').hide();
    idNumber = $('#id_number').val().trim();
    console.log(idNumber);
    var picture = null;
    database.ref().once('value', function (data) {
        // picture = data.child(idNumber).child('picture').val();
        // $('#youimg').append('Photo: <br><img src="' + picture + '">')


        // added extra information to the page
        picture = data.child(idNumber).child('picture').val();
        firstname = data.child(idNumber).child('firstname').val();
        lastname = data.child(idNumber).child('lastname').val();
        email = data.child(idNumber).child('email').val();

        $('#youimg').append('Photo: <br><img src="' + picture + '">')

        $('#name-display').append('Name: ' + firstname + ' ' + lastname);
        $('#email-display').append('Email: ' + email);

        $('#confirmation').append('ID Number: ' + idNumber);



        if (picture != null) {
            $('#youimg').append('<img src="' + picture + '">')
        } else {
            $('#youimg').html('Your credentials are incorrect!');
        }
    });
    $('#id_number').empty();
    $('.step2').show();
})

function enterPressed(e) {
    e = e || window.event;
    var key = e.keyCode;
    if (key == 13) //Enter
    {
        event.preventDefault();
    }
}

database.ref().once('value', function (data) {
    console.log(data.child('4320552453').child('picture').val());
});

//Sends image to Kairos and returns a console log with details of the face recognition
// var headers = {
//     "Content-type": "application/json",
//     "app_id": "b9f2d60a",
//     "app_key": "dadb4197732a9c1e434fb8eb6f6f4b76"
// };
// var picture = null;
// var payload = { "image": "" };
// database.ref().once('value', function (data) {
//     picture = data.child('4320552453').child('picture').val();
//     payload = { "image": picture };
//     var url = "http://api.kairos.com/detect";
//     // make request 
//     $.ajax(url, {
//         headers: headers,
//         type: "POST",
//         data: JSON.stringify(payload),
//         dataType: "text"
//     }).done(function (response) {
//         console.log(response);
//     });
// });
