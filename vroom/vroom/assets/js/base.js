var connetionOne;
var connetionTwo;
var conOneUrl = "192.168.8.104";
var conTwoUrl = "192.168.8.100";

$(document).ready(function(){

  if(localStorage.getItem('type') == 'company'){
    $('#myAddvertisment').addClass('displayHide');
  }
  else{
    $('#profile').addClass('displayHide');

  }
  window.setInterval(function(){
    $.ajax({
      url: 'http://'+conOneUrl+':8080/first/webapi/myresource',
      method: "get",
      dataType: 'json',
      success: function(response) {
        connetionOne = response;
      },
      error: function(xhr, ajaxOptions, thrownError) {
        connetionOne = xhr.responseText;
      }
    });

    $.ajax({
      url: 'http://'+conTwoUrl+':8080/first/webapi/myresource',
      method: "get",
      dataType: 'json',
      success: function(response) {
        connetionTwo = response;
      },
      error: function(xhr, ajaxOptions, thrownError) {
        connetionTwo = xhr.responseText;
      }
    });
  }, 1000);



});


function getDateAndTime(dateTime){
  dateTime = dateTime.split(" ");
  var date = dateTime[0];
  var time = dateTime[1];
  date = date.split("-");
  var month = getMonth(date[1]);
  var prifix;

  time = time.split(":");
  if(time[0] > 12){
    time[0] = time[0]%12;
    prifix = "pm";
  }
  else{
    prifix = 'am';
  }

  return month+"-"+date[2]+"   "+time[0]+":"+time[1]+" "+prifix;

}

function getMonth(month){
  if(month == '01'){
    return 'Jan';
  }
  else if(month == '02'){
    return 'Feb';
  }
  else if(month == '03'){
    return 'Mar';
  }
  else if(month == '04'){
    return 'April';
  }
  else if(month == '05'){
    return 'May';
  }
  else if(month == '06'){
    return 'Jun';
  }
  else if(month == '07'){
    return 'Jul';
  }
  else if(month == '08'){
    return 'Aug';
  }
  else if(month == '09'){
    return 'Sep';
  }
  else if(month == '10'){
    return 'Oct';
  }
  else if(month == '11'){
    return 'Nov';
  }
  else if(month == '12'){
    return 'Des';
  }
  else{
    return 'error';
  }
}



function logoutFunction(dataset,url) {
  $.ajax({
    url: 'http://'+url+':8080/first/webapi/logout',
    method: "POST",
    data:dataset,
    //cache: false,
    //dataType: 'json',
    success: function(response) {
      console.log(response);

      if(response == "Done"){
        window.location.replace("./index.html");
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("error"+xhr.responseText);
    }
  });
}


function logout(){
  var dataEnterType;
  if (connetionOne == 'ok' && connetionTwo == 'ok') {
    dataEnterType = 'both';
  } else {
    dataEnterType = 'onlyThis';
  }

  var dataset ={
    id:localStorage.getItem("id"),
    dataEnterType:dataEnterType
  };

  if (dataEnterType == 'both') {
    $.ajax({
      url: 'http://'+conOneUrl+':8080/first/webapi/logout',
      method: "POST",
      data:dataset,
      //cache: false,
    //  dataType: 'json',
      success: function(response) {
        console.log(response);
        response = response.split(',');
        if (response[0] == 'Done') {
          $.ajax({
            url: 'http://'+conTwoUrl+':8080/first/webapi/logout',
            method: "POST",
            data:dataset,
            //cache: false,
            //dataType: 'json',
            success: function(response) {
              console.log(response);
              window.location.replace("./index.html");
            },
            error: function(xhr, ajaxOptions, thrownError) {
              console.log("error"+xhr.responseText);
            }
          });
        }
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log("error"+xhr.responseText);
      }
    });
  } else {
    if (connetionOne == 'ok') {
      logoutFunction(dataset,conOneUrl);
    } else if (connetionTwo == 'ok') {
      logoutFunction(dataset,conTwoUrl);
    }
  }


}
