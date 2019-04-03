// MOBILE NAVIGATION
$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.step1').show();
    $('.step2').hide();
    $('.stepfail').hide();
    $('.steppass').hide();
});

function enterPressed(e){
    e=e||window.event;
    var key = e.keyCode;
    if(key==13) //Enter
    {
       event.preventDefault();
    }
  }

var headers = {
	"Content-type"    : "application/json",
	"app_id"          : "YOUR_APP_ID",
	"app_key"         : "YOUR_APP_KEY"
};
var payload  = { "image" : "YOUR_IMAGE_URL" };
var url = "http://api.kairos.com/detect";
// make request 
$.ajax(url, {
	headers  : headers,
    type: "POST",
    data: JSON.stringify(payload),
    dataType: "text"
}).done(function(response){
	console.log(response);
});

var database = firebase.database();
var idNumber = '';

$('.next1').on('click', function(){
    $('.step1').hide();
    idNumber = $('#id_number').val().trim();
    console.log(idNumber);
    $('#id_number').empty();
    $('.step2').show();
})

