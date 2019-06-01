var updateType=0;
$(document).ready (function(){

  if(localStorage.getItem('type') == 'company'){
    $('#coverUpdateCover').removeClass('displayHide');
  }

  $("#genralSettings").click (function(){
    var tel = $("#tel").val();
    var address = $("#address").val();
    var validation = true;

    if(tel.length != 10){
      $('#telDisplay').text("incorrect tele phone number");
      $("#telDisplay").css("opacity", "1");
      validation=false;
    }

    if(address.length == 0){
      $('#addressDisplay').text("incorrect address");
      $("#addressDisplay").css("opacity", "1");
      validation=false;
    }

    if (!validation) {
      return;
    }

    var url;
    if (connetionOne == 'ok') {
      url = conOneUrl;
    }
    else if(connetionTwo == 'ok') {
      url = conTwoUrl;
    }
    else{
      $('#genralSettingsError').css('opacity','1');
      $('#genralSettingsError').html("try again latter");
      return;
    }

    var dataEnterType;
    if (connetionOne == 'ok' && connetionTwo == 'ok') {
      dataEnterType = 'both';
    }
    else{
      dataEnterType = 'onlyThis';
    }
    var dataset = {
      tel:tel,
      address:address,
      key: localStorage.getItem("key"),
      id:localStorage.getItem("id"),
      dataEnterType:dataEnterType,
      type:localStorage.getItem('type'),
    };

    if (dataEnterType == 'both') {
      $.ajax({
         url: 'http://'+conOneUrl+':8080/first/webapi/genralSettings',
         type: "POST",
         data: dataset,
         cache: false,
         success: function(response) {
           console.log(response);

          if (response == "Done") {
            $.ajax({
               url: 'http://'+conTwoUrl+':8080/first/webapi/genralSettings',
               type: "POST",
               enctype: 'multipart/form-data',
               data: dataset,
               processData: false,
               contentType: false,
               cache: false,
               success: function(response) {
                 if (response == 'Done') {
                    $("#tel").val("");
                    $("#address").val("");
                 }
                 $('#genralSettingsError').css('opacity','1');
                 $('#genralSettingsError').text(response);
               },
               error: function(xhr, ajaxOptions, thrownError) {
                 console.log("error"+xhr.responseText);
                 console.log(xhr);
                 $('#genralSettingsError').css('opacity','1');
                 $('#genralSettingsError').text(response);
               }
             });
          }
          else{
            $('#genralSettingsError').css('opacity','1');
            $('#genralSettingsError').text(response);
          }

         },
         error: function(xhr, ajaxOptions, thrownError) {
           console.log("error"+xhr.responseText);
           console.log(xhr);
           $('#genralSettingsError').css('opacity','1');
           $('#genralSettingsError').text(response);

         }
       });
    }
    else {
      $.ajax({
         url: 'http://'+url+':8080/first/webapi/genralSettings',
         type: "POST",
         enctype: 'multipart/form-data',
         data: dataset,
         success: function(response) {
           if (response == 'Done') {
             $("#tel").val("");
             $("#address").val("");
           }
           $('#genralSettingsError').css('opacity','1');
           $('#genralSettings').text(response);
         },
         error: function(xhr, ajaxOptions, thrownError) {
           console.log("error"+xhr.responseText);
           console.log(xhr);
           $('#genralSettingsError').css('opacity','1');
           $('#genralSettings').text(response);
         }
       });
    }

  });

  $("#changePassword").click (function(){
    var currentPassword = $("#currentPassword").val();
    var newPassword = $("#newPassword").val();
    var confirmPassword = $("#confirmPassword").val();

    var validation = true;

    if(currentPassword.length == 0){
      $('#currentPasswordDisplay').text("Enter current password");
      $("#currentPasswordDisplay").css("opacity", "1");
      validation=false;
    }

    if(newPassword.length == 0){
      $('#newPasswordDisplay').text("Enter new password");
      $("#newPasswordDisplay").css("opacity", "1");
      validation=false;
    }

    if(confirmPassword.length == 0){
      $('#confirmPasswordDisplay').text("Confirm your new password");
      $("#confirmPasswordDisplay").css("opacity", "1");
      validation=false;
    }

    if(confirmPassword != newPassword){
      $('#confirmPasswordDisplay').text("password dosent match");
      $("#confirmPasswordDisplay").css("opacity", "1");
      validation=false;
    }

    if (!validation) {
      return;
    }

    var url;
    if (connetionOne == 'ok') {
      url = conOneUrl;
    }
    else if(connetionTwo == 'ok') {
      url = conTwoUrl;
    }
    else{
      $('#changePasswordError').css('opacity','1');
      $('#changePasswordError').html("try again latter");
      return;
    }

    var dataEnterType;
    if (connetionOne == 'ok' && connetionTwo == 'ok') {
      dataEnterType = 'both';
    }
    else{
      dataEnterType = 'onlyThis';
    }
    var dataset = {
      currentPassword:currentPassword,
      newPassword:newPassword,
      key: localStorage.getItem("key"),
      id:localStorage.getItem("id"),
      type:localStorage.getItem('type'),
      dataEnterType:dataEnterType
    };

    if (dataEnterType == 'both') {
      $.ajax({
         url: 'http://'+conOneUrl+':8080/first/webapi/passwordChange',
         type: "POST",
         data: dataset,
         cache: false,
         success: function(response) {
           console.log(response);

          if (response == "Done") {
            $.ajax({
               url: 'http://'+conTwoUrl+':8080/first/webapi/passwordChange',
               type: "POST",
               data: dataset,
               cache: false,
               success: function(response) {
                 if (response == 'Done') {
                   document.getElementById("changePasswordFrom").reset();
                 }
                 $('#changePasswordError').css('opacity','1');
                 $('#changePasswordError').text(response);
               },
               error: function(xhr, ajaxOptions, thrownError) {
                 console.log("error"+xhr.responseText);
                 console.log(xhr);
                 $('#changePasswordError').css('opacity','1');
                 $('#changePasswordError').text(response);
               }
             });
          }
          else{
            $('#changePasswordError').css('opacity','1');
            $('#changePasswordError').text(response);
          }

         },
         error: function(xhr, ajaxOptions, thrownError) {
           console.log("error"+xhr.responseText);
           console.log(xhr);
           $('#changePasswordError').text(response);
           $('#changePasswordError').css('opacity','1');
         }
       });
    }
    else {
      $.ajax({
         url: 'http://'+url+':8080/first/webapi/passwordChange',
         type: "POST",
         enctype: 'multipart/form-data',
         data: dataset,
         success: function(response) {
           if (response == 'Done') {
             document.getElementById("changePasswordFrom").reset();
           }
           $('#changePasswordError').css('opacity','1');
           $('#changePasswordError').text(response);
         },
         error: function(xhr, ajaxOptions, thrownError) {
           console.log("error"+xhr.responseText);
           console.log(xhr);
           $('#changePasswordError').css('opacity','1');
           $('#changePasswordError').text(response);
         }
       });
    }

  });

  $("#changeCoverPhoto").click (function(){
    var file = $("#file").val();

    if(file.length == 0){
      $('#fileDisplay').text("Insert picture");
      $("#fileDisplay").css("opacity", "1");
      return;
    }

    var url;
    if (connetionOne == 'ok') {
      url = conOneUrl;
    }
    else if(connetionTwo == 'ok') {
      url = conTwoUrl;
    }
    else{
      $('#changeCoverPhotoError').css('opacity','1');
      $('#changeCoverPhotoError').html("try again latter");
      return;
    }

    var dataEnterType;
    if (connetionOne == 'ok' && connetionTwo == 'ok') {
      dataEnterType = 'both';
    }
    else{
      dataEnterType = 'onlyThis';
    }

    var form = $('#coverUpdateCoverForm')[0];
    var data = new FormData(form);
    data.append("key", localStorage.getItem("key"));
    data.append("userId", localStorage.getItem("id"));

    if (dataEnterType == 'both') {
      data.append("dataEnterType",'both');
      console.log("both");
      $.ajax({
         url: 'http://'+conOneUrl+':8080/first/webapi/updateCoverPhoto',
         type: "POST",
         enctype: 'multipart/form-data',
         data: data,
         processData: false,
         contentType: false,
         cache: false,
         success: function(response) {
           console.log(response);

            if (response == "Done") {
              $.ajax({
                 url: 'http://'+conTwoUrl+':8080/first/webapi/updateCoverPhoto',
                 type: "POST",
                 enctype: 'multipart/form-data',
                 data: data,
                 processData: false,
                 contentType: false,
                 cache: false,
                 success: function(response) {
                   if (response == 'Done') {
                     $('#imageRowImage').attr('src', '');
                   }
                   $("#changeCoverPhotoError").css("opacity", "1");
                   $('#changeCoverPhotoError').text(response);
                 },
                 error: function(xhr, ajaxOptions, thrownError) {
                   console.log("error"+xhr.responseText);
                   console.log(xhr);
                   $("#changeCoverPhotoError").css("opacity", "1");
                   $('#changeCoverPhotoError').text(response);
                 }
               });
            }
            else{
              $("#changeCoverPhotoError").css("opacity", "1");
              $('#changeCoverPhotoError').text(response);
            }

         },
         error: function(xhr, ajaxOptions, thrownError) {
           console.log("error"+xhr.responseText);
           console.log(xhr);
           $('#changePasswordError').text(response);

         }
       });
    }
    else {
      data.append("dataEnterType",'onlyThis');
      console.log("onlyThis");
      $.ajax({
         url: 'http://'+url+':8080/first/webapi/updateCoverPhoto',
         type: "POST",
         enctype: 'multipart/form-data',
         data: data,
         processData: false,
         contentType: false,
         cache: false,
         success: function(response) {
           console.log(response);
           if (response == 'Done') {
             $('#imageRowImage').attr('src', '');
           }
           $("#changeCoverPhotoError").css("opacity", "1");
           $('#changeCoverPhotoError').text(response);
         },
         error: function(xhr, ajaxOptions, thrownError) {
           console.log("error"+xhr.responseText);
           console.log(xhr);
           $("#changeCoverPhotoError").css("opacity", "1");
           $('#changeCoverPhotoError').text(response);
         }
       });
    }

  });

  $("input").click(function(){
        var inputId = $(this).attr('id');
        var updateId = "#"+inputId+"Display";
        $(updateId).css("opacity","0");

  });

  $("#file").change(function() {
    updateType++;
    readURL(this);
  });

});


function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#imageRowImage').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }

}
