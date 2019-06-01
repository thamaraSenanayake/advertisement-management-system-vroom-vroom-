var updateType=0;
$(document).ready (function(){
  loadAdd();
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

    // if(file.length == 0){
    //   $('#fileDisplay').text("Insert picture");
    //   $("#fileDisplay").css("opacity", "1");
    //   validation=false;
    // }

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
    $('.editLoading').show();
    var dataEnterType;
    if (connetionOne == 'ok' && connetionTwo == 'ok') {
      dataEnterType = 'both';
    } else {
      dataEnterType = 'onlyThis';
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
    data.append("id",localStorage.getItem("editAddvertisment"));
    data.append("dataEnterType",dataEnterType);
    data.append("updateType",updateType);
    data.append("userId",localStorage.getItem('id'));
    data.append("key",localStorage.getItem('key'));
    console.log("dataEnterType"+dataEnterType);
    console.log("updateType"+updateType);

    if (dataEnterType == 'both') {
      $.ajax({
         url: 'http://'+conOneUrl+':8080/first/webapi/updateAdd',
         type: "POST",
         enctype: 'multipart/form-data',
         data: data,
         processData: false,
         contentType: false,
         cache: false,
         success: function(response) {
           console.log(response);
           if (response == 'Done') {
             $.ajax({
                url: 'http://'+conTwoUrl+':8080/first/webapi/updateAdd',
                type: "POST",
                enctype: 'multipart/form-data',
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                success: function(response) {
                  $('.editLoading').hide();
                  console.log(response);
                  if(response== 'Done'){
                    $('#dbError').css('opacity','1');
                    $('#dbError').html(response);
                  }

                },
                error: function(xhr, ajaxOptions, thrownError) {
                  $('#dbError').css('opacity','1');
                  $('#dbError').html("error");
                  console.log("error"+xhr.responseText);
                  console.log(xhr);
                  $('.editLoading').hide();
                }
              });
           }


         },
         error: function(xhr, ajaxOptions, thrownError) {
           console.log("error"+xhr.responseText);
           console.log(xhr);
           $('#dbError').css('opacity','1');
           $('#dbError').html("error");
           $('.editLoading').hide();
         }
       });
    } else {
      console.log(url);
      $.ajax({
        url: 'http://'+url+':8080/first/webapi/updateAdd',
        type: "POST",
        enctype: 'multipart/form-data',
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        success: function(response) {
          $('.editLoading').hide();
          console.log(response);
          $('#dbError').css('opacity','1');
          $('#dbError').html(response);


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
          $('#imageRowImage').attr('src',"http://"+url+":8080/first/webapi/getImage?location="+response[0].location);;
          $("#"+response[0].fuelType).prop("checked", true);
          $("#"+response[0].type).prop("checked", true);
          $("#"+response[0].transmission).prop("checked", true);
          $("#"+response[0].condition).prop("checked", true);

          console.log(response[0].fuelType);
          // $("input[name='fuel']:checked").val("petrol");
          // $("input[name='condition']:checked").val();
          // $("input[name='vehicalType']:checked").val();
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log("error"+xhr.responseText);
        }
      });
    }
    else{
      setTimeout(loadAdd, 250);
    }
}
