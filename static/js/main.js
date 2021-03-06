let url = 'http://127.0.0.1:8000/events/';
let submit = document.getElementById('submit');
let box = document.getElementById("organizer");
let input = document.getElementById("ajax");
let ulr2 = 'http://127.0.0.1:8000/register/' ;

$(document).ready(
       function() {
          $("#description1").hide();
          $("#date1").hide();
       }
    );


var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onload = function() {
    if (xhr.status === 200) {
        var userInfo = JSON.parse(xhr.responseText);
        console.log(userInfo)
    }
};
xhr.send();


function deleteEvent() {
	$.ajax(
		{
			url: url + $("#title1").val(),
			type: 'delete',
			success: function (data) {
				alert("Delete successful!")
			},
			error: function (error_data) {
				alert("Delete not successful!")
			}
		}
	)
}

function addEvent(){

  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
      if (xhr.status === 200 && xhr.readyState === 4) {
				console.log(data);
				console.log("success");
      }
      else {
				console.log("error");
				alert('Input another name');
      }
  };
  xhr.send(JSON.stringify({
		"name": $("#title").val(),
		"description": $("#description").val(),
		"date": $("#date").val()
	}));
  console.log('Event added')
}

function registering() {

  var xhr = new XMLHttpRequest();
  xhr.open('POST', ulr2);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200 && xhr.readyState === 4) {
				console.log("success");
				alert('Yes');
    }
    else {
				console.log("error");
				alert('NO');
		}

  };
  xhr.send(JSON.stringify({
                "username": $("#id_username").val(),
                "email": $("#id_email").val(),
                "password": $("#id_password1").val(),
                "password_2": $("#id_password2").val()
            }));
  console.log('New user!')
}


function getEvent(){
    let title = document.getElementById("title1");

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url + title.value);
    xhr.onload = function() {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var eventInfo = JSON.parse(xhr.responseText);
            showEvent(eventInfo);
            console.log('Everything is okay!')
        }
        else {
            alert("Sorry! Event not found!")
        }
    };
  xhr.send();
}

function showEvent(event){

	$("#title1").val(event.name);
	$("#description1").val(event.description).show();
	$("#date1").val(event.date).show();
}

function show() {
    let ourRequest = new XMLHttpRequest();
    ourRequest.open("GET", url);
    ourRequest.onload = function() {
		let ourData = JSON.parse(ourRequest.responseText);
		renderHTML(ourData);
	};
    ourRequest.send();

}
show();


function renderHTML(data) {
	for (let i=0; i < data.length; i++){
	    let a = document.createElement('a');
	    let linkText = document.createTextNode(data[i].name);
		a.appendChild(linkText);
		a.href = "http://127.0.0.1:8000/events/" + data[i].name + '/';
	    let li_elem = document.createElement('li');
	    li_elem.appendChild(a);
	    li_elem.title = data[i].name;
	    li_elem.id = 'list' + data[i].name;
	    document.getElementById("ourcontainer").appendChild(li_elem);
	}
}
