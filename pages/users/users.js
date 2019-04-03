
var database = firebase.database();

database.ref().once('value', function (data) {
picture = data.child("4320552453").child('picture').val();
firstName = data.child("4320552453").child('firstname').val();
lastName = data.child("4320552453").child('lastname').val();
$('#image').html('<img src="' + picture + '">')
$('#image').append(firstName)
$('#image').append(lastName + "</br>")


});

database.ref().once('value', function (data) {
    picture = data.child("1407839227").child('picture').val();
    $('#image2').html('<img src="' + picture + '">')
    firstName = data.child("4320552453").child('firstname').val();
lastName = data.child("4320552453").child('lastname').val();
$('#image').html('<img src="' + picture + '">')
$('#image').append(firstName)
$('#image').append(lastName + "</br>")

    });
    

    database.ref().once('value', function (data) {
        picture = data.child("7379330380").child('picture').val();
        $('#image3').html('<img src="' + picture + '">')
        firstName = data.child("4320552453").child('firstname').val();
lastName = data.child("4320552453").child('lastname').val();
$('#image').html('<img src="' + picture + '">')
$('#image').append(firstName)
$('#image').append(lastName + "</br>")

        });
        

        database.ref().once('value', function (data) {
            picture = data.child("7865599256").child('picture').val();
            $('#image4').html('<img src="' + picture + '">')
            firstName = data.child("4320552453").child('firstname').val();
lastName = data.child("4320552453").child('lastname').val();
$('#image').html('<img src="' + picture + '">')
$('#image').append(firstName)
$('#image').append(lastName + "</br>")

            });
            

            database.ref().once('value', function (data) {
                picture = data.child("7888700004").child('picture').val();
                $('#image5').html('<img src="' + picture + '">')
                firstName = data.child("4320552453").child('firstname').val();
lastName = data.child("4320552453").child('lastname').val();
$('#image').html('<img src="' + picture + '">')
$('#image').append(firstName)
$('#image').append(lastName + "</br>")

                });
                

                database.ref().once('value', function (data) {
                    picture = data.child("8956146359").child('picture').val();
                    $('#image6').html('<img src="' + picture + '">')
                    firstName = data.child("4320552453").child('firstname').val();
lastName = data.child("4320552453").child('lastname').val();
$('#image').html('<img src="' + picture + '">')
$('#image').append(firstName)
$('#image').append(lastName + "</br>")

                    });
                    
                    