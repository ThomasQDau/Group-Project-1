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
    var picture = null;
    database.ref().once('value', function (data) {
        picture = data.child(idNumber).child('picture').val();
        if (picture != null) {
            $('#youimg').append('<img src="' + picture + '">')
            // Sends image to Kairos and returns a console log with details of the face recognition
            var headers = {
                "Content-type": "application/json",
                "app_id": "b9f2d60a",
                "app_key": "dadb4197732a9c1e434fb8eb6f6f4b76",
            };
            var picture = null;
            var payload = { "image": "" };
            database.ref().once('value', function (data) {
                picture = data.child(idNumber).child('picture').val();
                payload = { "image": picture };
                var url = "http://api.kairos.com/detect";
                // make request 
                $.ajax(url, {
                    headers: headers,
                    type: "POST",
                    data: JSON.stringify(payload),
                    dataType: "text"
                }).done(function (response) {
                    var kairosObject = JSON.parse(response);
                    console.log(kairosObject);
                    var asian = kairosObject.images[0].faces[0].attributes.asian;
                    console.log(asian);
                    var age = kairosObject.images[0].faces[0].attributes.age;
                    console.log(age);
                });
            });
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