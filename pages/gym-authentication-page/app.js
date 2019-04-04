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
        // picture = data.child(idNumber).child('picture').val();
        // $('#youimg').append('Photo: <br><img src="' + picture + '">')


        // added extra information to the page
        picture = data.child(idNumber).child('picture').val();
        firstname = data.child(idNumber).child('firstname').val();
        lastname = data.child(idNumber).child('lastname').val();
        email = data.child(idNumber).child('email').val();

        // $('#youimg').append('Photo: <br><img src="' + picture + '">')

        $('#name-display').append('Name: ' + firstname + ' ' + lastname);
        $('#email-display').append('Email: ' + email);

        $('#confirmation').append('ID Number: ' + idNumber);



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

                    
                    console.log('================================================');

                    // enroll
                    var request = new XMLHttpRequest();
                    request.open('POST', 'https://api.kairos.com/enroll');
                    request.setRequestHeader('Content-Type', 'application/json');
                    request.setRequestHeader('app_id', 'b9f2d60a');
                    request.setRequestHeader('app_key', 'dadb4197732a9c1e434fb8eb6f6f4b76');
                    request.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            // console.log('Status:', this.status);
                            // console.log('Headers:', this.getAllResponseHeaders());
                            // console.log('Body:', this.responseText);

                            var enrollObj = JSON.parse(this.responseText);
                            // console.log('Body:' + enrollObj);


                            var subjectId = enrollObj.images[0].transaction.subject_id;
                            console.log('Subject ID: ' + subjectId);

                            var status = enrollObj.images[0].transaction.status;
                            console.log('Status: ' + status);

                            var confidence = enrollObj.images[0].transaction.confidence;
                            console.log('Confidence: ' + confidence);

                        }
                    };

                    var body = {
                        'image': picture,
                        'subject_id': firstname,
                        'gallery_name': 'MyGallery'
                    };

                    request.send(JSON.stringify(body));



                    console.log('================================================');



                    // verify
                    var request = new XMLHttpRequest();
                    request.open('POST', 'https://api.kairos.com/verify');
                    request.setRequestHeader('Content-Type', 'application/json');
                    request.setRequestHeader('app_id', 'b9f2d60a');
                    request.setRequestHeader('app_key', 'dadb4197732a9c1e434fb8eb6f6f4b76');
                    request.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            //   console.log('Status:', this.status);
                            //   console.log('Headers:', this.getAllResponseHeaders()); 
                            console.log('Body:', this.responseText);

                            var verifyObj = JSON.parse(this.responseText);
                            // console.log('Body:' + verifyObj);

                            var subjectId = verifyObj.images[0].transaction.subject_id;
                            console.log('Subject ID: ' + subjectId);
                            $('#identification').append('Subject ID: ' + subjectId + '<br>');

                            var status = verifyObj.images[0].transaction.status;
                            console.log('Status: ' + status);
                            $('#identification').append('Status: ' + status + '<br>');

                            var confidence = verifyObj.images[0].transaction.confidence;
                            console.log('Confidence: ' + confidence);
                            $('#identification').append('Confidence: ' + confidence + '<br>');

                            if (confidence < .60 && status != success) {
                                $('#identification').append('Confidence level is under .6 and status is unsuccess thus user is not correct. Please show another form of identification.');
                            } else {
                                $('#identification').append('Confidence level is over .6 and status is success thus we have determined this is you!');
                            }
                        }
                    };

                    var body = {
                        'image': picture,
                        'gallery_name': 'MyGallery',
                        'subject_id': firstname
                    };

                    request.send(JSON.stringify(body));

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