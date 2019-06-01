var updateType=0;
$(document).ready (function(){
  loadAdd();
  $("#submit").click (function(){
    var brand = $("#brand").val();
    var tel = $("#tel").val();
    var address = $("#address").val();
    var email = $("#email").val();
    var model = $("#model").val();
    var year = $("#year").val();
    var milage = $("#milage").val();
    var capacity = $("#capacity").val();
    var price = $("#price").val();
    var file = $("#file").val();

    var validation = true;

    if(tel.length != 10){
      $('#telDisplay').text("incorrect tele phone number");
      $("#telDisplay").css("opacity", "1");
      validation=false;
    }

    if(email == 0){
      $('#emailDisplay').text("incorrect email address");
      $("#emailDisplay").css("opacity", "1");
      validation=false;
    }

    if(address == 0){
      $('#addressDisplay').text("incorrect address");
      $("#addressDisplay").css("opacity", "1");
      validation=false;
    }

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
      $('#dbErrorLogin').css('opacity','1');
      $('#dbErrorLogin').html("try again latter");
      return;
    }

    var dataEnterType;

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
    data.append("userId",11);
    data.append("updateType",updateType);
    data.append("address",address);
    data.append("tel",tel);
    data.append("email",email);

    if (connetionOne == 'ok' && connetionTwo == 'ok') {
      data.append("dataEnterType",'both');

      $.ajax({
         url: 'http://'+conOneUrl+':8080/first/webapi/insertUnRegisteredAdd',
         type: "POST",
         enctype: 'multipart/form-data',
         data: data,
         processData: false,
         contentType: false,
         cache: false,
         success: function(response) {
           console.log(response);

           $.ajax({
              url: 'http://'+conTwoUrl+':8080/first/webapi/insertUnRegisteredAdd',
              type: "POST",
              enctype: 'multipart/form-data',
              data: data,
              processData: false,
              contentType: false,
              cache: false,
              success: function(response) {
                console.log(response);

              },
              error: function(xhr, ajaxOptions, thrownError) {
                console.log("error"+xhr.responseText);
                console.log(xhr);
              }
            });
         },
         error: function(xhr, ajaxOptions, thrownError) {
           console.log("error"+xhr.responseText);
           console.log(xhr);
         }
       });


    } else {
      data.append("dataEnterType",'onlyThis');
      $.ajax({
         url: 'http://'+url+':8080/first/webapi/insertUnRegisteredAdd',
         type: "POST",
         enctype: 'multipart/form-data',
         data: data,
         processData: false,
         contentType: false,
         cache: false,
         success: function(response) {
           console.log(response);

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
function loadAdd() {
    if(connetionOne == 'ok' || connetionTwo == 'ok'){
      var url;

      var url;
      if (connetionOne == 'ok') {
        url = conOneUrl;
      }
      else if(connetionTwo == 'ok') {
        url = conTwoUrl;
      }
      else{
        console.log("error");
      }
      var dataset = {
        key: localStorage.getItem("key"),
        id:localStorage.getItem("id"),
        addId:localStorage.getItem("editAddvertisment"),
      };
      $.ajax({
        url: 'http://'+url+':8080/first/webapi/getEditAdd',
        method: "POST",
        data: dataset,
        //cache: false,
        dataType: 'json',
        success: function(response) {
          console.log(response);
          $("#brand").val(response[0].brand);
          $("#model").val(response[0].model);
          $("#year").val(response[0].year);
          $("#milage").val(response[0].milage);
          $("#capacity").val(response[0].capacity);
          $("#price").val(response[0].price);
          $('#imageRowImage').attr('src',"http://"+url+":8080/first/webapi/getImage?location="+response[0].location);
          $("input[name='fuel']:checked").val("petrol");
          $("input[name='condition']:checked").val();
          $("input[name='vehicalType']:checked").val();
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log("error"+xhr.responseText);
        }
      });
    }
    else{
      // setTimeout(loadAdd, 250);
    }
}
