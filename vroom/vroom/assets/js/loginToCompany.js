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
    var comanyName = $("#comanyName").val();

    var validation= true;

    if (password.length===0) {
      $("#passwordDisplay").css("opacity", "1");
      $("#passwordDisplay").text("Enter password");
      validation= false;
    }
    if(comanyName.length===0){
      $("#comanyNameDisplay").css("opacity", "1");
      $("#comanyNameDisplay").text("Enter email");
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
       comName : comanyName,
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
      $('#dbErrorLogin').html("try again latter");
      return;
    }
    $.ajax({
       url: 'http://'+url+':8080/first/webapi/loginCompany',
       method: "post",
       //cache: false,
       data: dataset,
       // dataType: 'json',
       success: function(response) {
         response = response.split(",");
         console.log(response[0]);
         if(response[0] == 'Valid user'){
           localStorage.setItem("id",response[2]);
           localStorage.setItem("key",response[1]);
           localStorage.setItem("type","company");
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
    var comanyName = $("#signInCarSellname").val();
    var ownerName = $("#ownerName").val();
    var address = $("#address").val();
    var tel = $("#tel").val();
    var email = $("#signInEmail").val();
    var confirmPassword = $("#signInConfirmPassword").val();
    //console.log(password);


    var validation= true;

    if (password.length===0) {
      $("#signInPasswordDisplay").css("opacity", "1");
      $("#signInPasswordDisplay").text("Enter password");
      validation= false;
    }
    else if(password.length < 8){
      $("#signInPasswordDisplay").css("opacity", "1");
      $("#signInPasswordDisplay").text("password should have more than 8 charaters");
      validation= false;
    }
    else if(password != confirmPassword){
      $("#signInConfirmPasswordDisplay").css("opacity", "1");
      $("#signInConfirmPasswordDisplay").text("password dosent match");
      validation= false;
    }

    if(comanyName.length===0){
      $("#signInCarSellnameDisplay").css("opacity", "1");
      $("#signInCarSellnameDisplay").text("Enter Company name");
      validation= false;
    }

    if(ownerName.length===0){
      $("#ownerNameDisplay").css("opacity", "1");
      $("#ownerNameDisplay").text("Enter Owner name");
      validation= false;
    }

    if(address.length===0){
      $("#addressDisplay").css("opacity", "1");
      $("#addressDisplay").text("Enter comany address");
      validation= false;
    }

    if(tel.length===0){
      $("#telDisplay").css("opacity", "1");
      $("#telDisplay").text("Enter tele phone number");
      validation= false;
    }

    if(email.length===0){
      $("#signInEmailDisplay").css("opacity", "1");
      $("#signInEmailDisplay").text("Enter email address");
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
       comName : comanyName,
       password : password,
       email:email,
       tel:tel,
       address:address,
       ownerName:ownerName,
       dataEnterType:dataEnterType,
    };

    if (dataEnterType == 'both') {

      $.ajax({
         url: 'http://'+conTwoUrl+':8080/first/webapi/registerCompany',
         method: "post",
         //cache: false,
         data: dataset,
         // dataType: 'json',
         success: function(responseOne) {
           responseOne = responseOne.split(",");
           console.log(responseOne);
           if (response[0] == 1) {
             $.ajax({
                url: 'http://'+conOneUrl+':8080/first/webapi/registerCompany',
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
                    localStorage.setItem("type","company");
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
                  $('#dbErrorSign').html("error try agin latter");
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
           $('#dbErrorSign').html("error try agin latter");
         }
       });

    }
    else {
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
     url: 'http://'+url+':8080/first/webapi/registerCompany',
     method: "post",
     //cache: false,
     data: dataset,
     // dataType: 'json',
     success: function(response) {
       response = response.split(",");
       console.log(response);
       if (response[0] == 1) {
         localStorage.setItem("id",response[2]);
         localStorage.setItem("key",response[1]);
         localStorage.setItem("type","company");
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
