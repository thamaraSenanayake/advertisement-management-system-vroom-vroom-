$(document).ready (function(){
  $("#submit").click (function(){
    var brand = $("#brand").val();
    var model = $("#model").val();
    var year = $("#year").val();
    var milage = $("#milage").val();
    var capacity = $("#capacity").val();
    var price = $("#price").val();
    var file = $("#file").val();

    var validation = true;
    if(brand.length == 0){
      $('#brandDisplay').text("incorrect vehicale brand");
      $("#brandDisplay").css("opacity", "1");
      validation=false;
    }

    if(model.length == 0){
      $('#modelDisplay').text("incorrect vehicale model");
      $("#modelDisplay").css("opacity", "1");
      validation=false;
    }

    if(year.length != 4){
      $('#yearDisplay').text("incorrect vehicale manufacture year");
      $("#yearDisplay").css("opacity", "1");
      validation=false;
    }

    if(milage.length == 0){
      $('#milageDisplay').text("incorrect vehicale milage");
      $("#milageDisplay").css("opacity", "1");
      validation=false;
    }
    else{
      if(isNaN(milage)){
        $('#milageDisplay').text("incorrect vehicale milage");
        $("#milageDisplay").css("opacity", "1");
        validation=false;
      }

    }

    if(capacity.length == 0){
      $('#capacityDisplay').text("incorrect vehicale engine capacity");
      $("#capacityDisplay").css("opacity", "1");
      validation=false;
    }

    if(price.length == 0){
      $('#priceDisplay').text("incorrect vehicale price");
      $("#priceDisplay").css("opacity", "1");
      validation=false;
    }

    if(file.length == 0){
      $('#fileDisplay').text("Insert picture");
      $("#fileDisplay").css("opacity", "1");
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
      $('#dbError').css('opacity','1');
      $('#dbError').html("try again later");
      return;
    }

    var form = $('#addAddvertisment')[0];

    var data = new FormData(form);
    data.append("brand", brand);
    data.append("model", model);
    data.append("year", year);
    data.append("milage", milage);
    data.append("capacity", capacity);
    data.append("fuel", $("input[name='fuel']:checked").val());
    data.append("transmisstion",$("input[name='transmission']:checked").val());
    data.append("condition", $("input[name='condition']:checked").val());
    data.append("vehicalType", $("input[name='vehicalType']:checked").val());
    data.append("price",price);
    data.append("userId",localStorage.getItem('id'));
    data.append("key",localStorage.getItem('key'));

    $('.loadingImage').show();

    if (connetionOne == 'ok' && connetionTwo == 'ok') {
      data.append("dataEnterType",'both');
      console.log("both");


      $.ajax({
         url: 'http://'+conOneUrl+':8080/first/webapi/insertAdd',
         type: "POST",
         enctype: 'multipart/form-data',
         data: data,
         processData: false,
         contentType: false,
         cache: false,
         success: function(response) {
           console.log(response);

           $.ajax({
              url: 'http://'+conTwoUrl+':8080/first/webapi/insertAdd',
              type: "POST",
              enctype: 'multipart/form-data',
              data: data,
              processData: false,
              contentType: false,
              cache: false,
              success: function(response) {
                $('.loadingImage').hide();
                console.log(response);
                if (response == 'Done') {
                  document.getElementById("addAddvertisment").reset();

                  $('#dbError').css('opacity','1');
                  $('#dbError').html("Uploaded successfully");
                  $('#imageRowImage').attr('src',"");

                }
                else{
                  $('#dbError').css('opacity','1');
                  $('#dbError').html(response);
                }
              },
              error: function(xhr, ajaxOptions, thrownError) {
                console.log("error"+xhr.responseText);
                console.log(xhr);
                $('.loadingImage').hide();
              }
            });
         },
         error: function(xhr, ajaxOptions, thrownError) {
           console.log("error"+xhr.responseText);
           console.log(xhr);
           $('.loadingImage').hide();
         }
       });


    } else {
      data.append("dataEnterType",'onlyThis');
      console.log("only this");

      $.ajax({
         url: 'http://'+url+':8080/first/webapi/insertAdd',
         type: "POST",
         enctype: 'multipart/form-data',
         data: data,
         processData: false,
         contentType: false,
         cache: false,
         success: function(response) {
           console.log(response);
           if (response == 'Done') {
             document.getElementById("addAddvertisment").reset();

             $('#dbError').css('opacity','1');
             $('#dbError').html("Uploaded successfully");
             $('#imageRowImage').attr('src',"");

           }
           else{
             $('#dbError').css('opacity','1');
             $('#dbError').html(response);
           }
         },
         error: function(xhr, ajaxOptions, thrownError) {
           console.log("error"+xhr.responseText);
           console.log(xhr);
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
