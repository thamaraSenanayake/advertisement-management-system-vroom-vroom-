$(document).ready (function(){

  $("#moveTosignIn").click (function(){
    $('#loginPage').fadeOut(function(){
      $('#signinPage').fadeIn();
    });

  });

  $("#moveTologIn").click (function(){
    $('#signinPage').fadeOut( function(){
      $('#loginPage').fadeIn();
    });
  });

  $("#login").click (function(){
    var password = $("#password").val();
    var email = $("#email").val();

    var validation= true;

    if (password.length===0) {
      $("#passwordDisplay").css("opacity", "1");
      $("#passwordDisplay").text("Enter password");
      validation= false;
    }
    if(email.length===0){
      $("#emailDisplay").css("opacity", "1");
      $("#emailDisplay").text("Enter email");
      validation= false;
    }
    if(validation==false){
      return;
    }

    var dataEnterType;
    if (connetionOne == 'ok' && connetionTwo == 'ok') {
      dataEnterType = 'both';
    } else {
      dataEnterType = 'onlyThis';
    }

    var dataset = {
       userName : email,
       password : password,
       dataEnterType : dataEnterType
    };

    console.log(connetionOne);
    console.log(connetionTwo);
    var url;
    if (connetionOne == 'ok') {
      url = conOneUrl;
    }
    else if(connetionTwo == 'ok') {
      url = conTwoUrl;
    }
    else{
      $('#dbErrorLogin').css('opacity','1');
      $('#dbErrorLogin').html("try again later");
      return;
    }
    $.ajax({
       url: 'http://'+url+':8080/first/webapi/loginUser',
       method: "post",
       //cache: false,
       data: dataset,
       // dataType: 'json',
       success: function(response) {
         console.log(response);
         response = response.split(",");
         if(response[0]== 'Valid user'){
           localStorage.setItem("id",response[2]);
           localStorage.setItem("key",response[1]);
           localStorage.setItem("type","User");
           window.location.href = "home.html";
         }

         $('#dbErrorLogin').css('opacity','1');
         $('#dbErrorLogin').html(response[0]);


       },
       error: function(xhr, ajaxOptions, thrownError) {
         console.log("error"+xhr.responseText);
         console.log(xhr);
       }
     });

  });

  $("#signIn").click (function(){
    var password = $("#signInPassword").val();
    var email = $("#signInEmail").val();
    var name = $("#name").val();
    var address = $("#address").val();
    var tel = $("#tel").val();
    var confirmPassword = $("#signInConfirmPassword").val();


    var validation= true;

    if (password.length===0) {
      $("#signInPasswordDisplay").css("opacity", "1");
      $("#signInPasswordDisplay").text("Enter password");
      validation= false;
    }
    else if(password.length < 8){
      $("#signInPasswordDisplay").css("opacity", "1");
      $("#signInPasswordDisplay").text("password should be more than 8 charaters");
      validation= false;
    }
    else if(password != confirmPassword){
      $("#signInConfirmPasswordDisplay").css("opacity", "1");
      $("#signInConfirmPasswordDisplay").text("password doesn't match");
      validation= false;
    }

    if(email.length===0){
      $("#signInEmailDisplay").css("opacity", "1");
      $("#signInEmailDisplay").text("Enter email");
      validation= false;
    }
    if(name.length===0){
      $("#nameDisplay").css("opacity", "1");
      $("#nameDisplay").text("Enter name");
      validation= false;
    }
    if(address.length===0){
      $("#addressDisplay").css("opacity", "1");
      $("#addressDisplay").text("Enter address");
      validation= false;
    }
    if(tel.length===0){
      $("#telDisplay").css("opacity", "1");
      $("#telDisplay").text("Enter tele phone number");
      validation= false;
    }

    if(validation==false){
      return;
    }

    var dataEnterType;
    if (connetionOne == 'ok' && connetionTwo == 'ok') {
      dataEnterType = 'both';
    } else {
      dataEnterType = 'onlyThis';
    }

    var dataset = {
       name : name,
       password : password,
       email:email,
       tel:tel,
       address:address,
       dataEnterType:dataEnterType,
    };

    if (dataEnterType == 'both') {
      $.ajax({
         url: 'http://'+conTwoUrl+':8080/first/webapi/registerUser',
         method: "post",
         //cache: false,
         data: dataset,
         // dataType: 'json',
         success: function(responseOne) {
           responseOne = responseOne.split(",");
           console.log(responseOne);
           if (responseOne[0] == 1) {
             $.ajax({
                url: 'http://'+conOneUrl+':8080/first/webapi/registerUser',
                method: "post",
                //cache: false,
                data: dataset,
                // dataType: 'json',
                success: function(response) {
                  response = response.split(",");
                  console.log(response);
                  if (response[0] == 1) {
                    localStorage.setItem("id",responseOne[2]);
                    localStorage.setItem("key",responseOne[1]);
                    localStorage.setItem("type","user");
                    window.location.href = "home.html";
                  }
                  else{
                    $('#dbErrorSign').css('opacity','1');
                    $('#dbErrorSign').html(response[0]);
                  }

                },
                error: function(xhr, ajaxOptions, thrownError) {
                  console.log("error"+xhr.responseText);
                  console.log(xhr);
                  $('#dbErrorSign').css('opacity','1');
                  $('#dbErrorSign').html("error try agin later");
                }
              });
           }
           else{
             $('#dbErrorSign').css('opacity','1');
             $('#dbErrorSign').html(responseOne[0]);
           }

         },
         error: function(xhr, ajaxOptions, thrownError) {
           console.log("error"+xhr.responseText);
           console.log(xhr);
           $('#dbErrorSign').css('opacity','1');
           $('#dbErrorSign').html("error try agin later");
         }
       });

    } else {
      if (connetionOne == 'ok') {
        signinfunction(dataset,conOneUrl);
      } else if (connetionTwo == 'ok') {
        signinfunction(dataset,conTwoUrl);
      }
      else{
        $('#dbErrorSign').css('opacity','1');
        $('#dbErrorSign').html("try again later");
      }
    }

  });

  $("input").click(function(){
        var inputId = $(this).attr('id');
        var updateId = "#"+inputId+"Display";
        $(updateId).css("opacity","0");

  });

});


function signinfunction(dataset,url){
  console.log(dataset);

  $.ajax({
     url: 'http://'+url+':8080/first/webapi/registerUser',
     method: "post",
     //cache: false,
     data: dataset,
     // dataType: 'json',
     success: function(response) {
       console.log(response);
       response = response.split(",");
       console.log(response);
       if (response[0] == 1) {
         localStorage.setItem("id",response[2]);
         localStorage.setItem("key",response[1]);
         localStorage.setItem("type","user");
         window.location.href = "home.html";
       }
       else{
         $('#dbErrorSign').css('opacity','1');
         $('#dbErrorSign').html(response[0]);
       }
     },
     error: function(xhr, ajaxOptions, thrownError) {
       console.log("error"+xhr.responseText);
       console.log(xhr);
     }
   });
}
