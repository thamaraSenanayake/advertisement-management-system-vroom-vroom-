$(document).ready (function(){
  loadAdd();
  $(".searchBar").click (function(){
     var display = $('.serchCategoryBar').css("display");

      if (display == 'none') {
        $('.serchCategoryBar').fadeIn();
      }
      else{
        $('.serchCategoryBar').fadeOut();

      }
  });

  $("#search").click (function(){
    var brand = $("#brand").val();
    var model = $("#model").val();
    var condition = $("input[name='condition']:checked").val();
    var validation = true;

    if (brand.length===0) {
      $("#brandDisplay").css("opacity", "1");
      $("#brandDisplay").text("Enter brand");
      validation= false;
    }
    if(model.length===0){
      $("#modelDisplay").css("opacity", "1");
      $("#modelDisplay").text("Enter model");
      validation= false;
    }

    if(validation==false){
      return;
    }

    $('.vehicalDetailContainerFullSerchAppend').empty();
    $('.vehicalDetailContainerBranbModelAppend').empty();
    $('.vehicalDetailContainerModelAppend').empty();
    $('.vehicalDetailContainerTypeAppend').empty();

    var dataset = {
       model : model,
       brand : brand,
       condition: condition,
       key: localStorage.getItem("key"),
       id:localStorage.getItem("id"),
    };
    localStorage.setItem("model", model);
    localStorage.setItem("brand", brand);


    $('.vehicalDetailContainerLocalAppend').empty();
    $('.vehicalDetailContainerAppend').empty();

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
       url: 'http://'+url+':8080/first/webapi/fullSerchAdd',
       method: "post",
       //cache: false,
       data: dataset,
       dataType: 'json',
       success: function(response) {
         console.log(response);
         addSerch('FullSerch',response,url);

       },
       error: function(xhr, ajaxOptions, thrownError) {
         console.log("error"+xhr.responseText);
         console.log(xhr);
       }
     });

    if(connetionTwo == 'ok') {
       url = conTwoUrl;
     }
     else if (connetionOne == 'ok') {
       url = conOneUrl;
     }
     else{
       $('#dbErrorLogin').css('opacity','1');
       $('#dbErrorLogin').html("try again later");
       return;
     }
     $.ajax({
        url: 'http://'+url+':8080/first/webapi/brandModelSerchAdd',
        method: "post",
        //cache: false,
        data: dataset,
        dataType: 'json',
        success: function(response) {
          console.log(response);
          addSerch('BranbModel',response,url);


        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log("error"+xhr.responseText);
          console.log(xhr);
        }
      });

      if (connetionTwo == 'ok') {
        url = conTwoUrl;
      }
      else if(connetionOne == 'ok') {
         url = conOneUrl;
       }
       else{
         $('#dbErrorLogin').css('opacity','1');
         $('#dbErrorLogin').html("try again later");
         return;
       }
       $.ajax({
          url: 'http://'+url+':8080/first/webapi/modelSerchAdd',
          method: "post",
          //cache: false,
          data: dataset,
          dataType: 'json',
          success: function(response) {
            console.log(response);
            addSerch('Model',response,url);


          },
          error: function(xhr, ajaxOptions, thrownError) {
            console.log("error"+xhr.responseText);
            console.log(xhr);
          }
        });

        if(connetionOne == 'ok') {
           url = conOneUrl;
         }
         else if (connetionTwo == 'ok') {
           url = conTwoUrl;
         }
         else{
           $('#dbErrorLogin').css('opacity','1');
           $('#dbErrorLogin').html("try again later");
           return;
         }
         $.ajax({
            url: 'http://'+url+':8080/first/webapi/typeSerchAdd',
            method: "post",
            //cache: false,
            data: dataset,
            dataType: 'json',
            success: function(response) {
              console.log(response);
              addSerch('Type',response,url);


            },
            error: function(xhr, ajaxOptions, thrownError) {
              console.log("error"+xhr.responseText);
              console.log(xhr);
            }
          });
  });

  $("input").click(function(){
        var inputId = $(this).attr('id');
        var updateId = "#"+inputId+"Display";
        $(updateId).css("opacity","0");

  });


});

function loadAdd() {
    if(connetionOne == 'ok' || connetionTwo == 'ok'){
      var url;

      var url;
      if (connetionOne == 'ok') {
        url = conOneUrl;
        console.log("connetionOne");
      }
      else if(connetionTwo == 'ok') {
        url = conTwoUrl;
        console.log("connetionTwo");
      }
      else{
        console.log("error");
      }
      var dataset = {
        key: localStorage.getItem("key"),
        id:localStorage.getItem("id"),
      };
      $.ajax({
        url: 'http://'+url+':8080/first/webapi/displayAdd',
        method: "POST",
        data: dataset,
        //cache: false,
        dataType: 'json',
        success: function(response) {
          $('.vehicalDetailContainerAppend').empty();
          console.log(response);
          for (var i = response.length-1; i > -1; i--) {
             var block = $('#vehicalDetailContainerBlock').html();
             block = block.replace('PRICE',response[i].price);
             block = block.replace('BRAND',response[i].brand);
             block = block.replace('MODEL',response[i].model);
             block = block.replace('YEAR',response[i].year);
             block = block.replace('CONDITION',response[i].condition);
             block = block.replace('TRANSMISSTION',response[i].transmission);
             block = block.replace('FUEL',response[i].fuelType);
             block = block.replace('CAPACITY',response[i].capacity);
             block = block.replace('MILAGE',response[i].milage+" km");
             block = block.replace('PRICE',response[i].price);
             block = block.replace('ADDDRESS',response[i].address);
             block = block.replace(/EMAILADDRESS/gi,response[i].email);
             block = block.replace('TEL',response[i].tel);
             block = block.replace(/IDNUM/gi,response[i].id);
             block = block.replace('COMNAME',response[i].addtype);
             block = block.replace('SRC',"http://"+url+":8080/first/webapi/getImage?location="+response[i].location);
             if(isNaN(response[i].addtype)){
               block = block.replace('DISPLAY','');
             }
             else{
               block = block.replace('DISPLAY','displayHide');
             }
             $('.vehicalDetailContainerAppend').append(block);
           }
           loadComment(url);
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log("error"+xhr.responseText);
        }

      });

      var localModel = localStorage.getItem("model");
      var localBrand = localStorage.getItem("brand");

      if(localModel != null){

        var dataset={
          model:localModel,
          brand:localBrand,
          key: localStorage.getItem("key"),
          id:localStorage.getItem("id"),
        };
        $.ajax({
          url: 'http://'+url+':8080/first/webapi/localStrogeSerchAdd',
          method: "POST",
          data: dataset,
          //cache: false,
          dataType: 'json',
          success: function(response) {
            console.log(response);
            addSerch('Local',response,url);
          },
          error: function(xhr, ajaxOptions, thrownError) {
            console.log("error"+xhr.responseText);
          }
        });
      }
    }
    else{
      console.log("else");
      setTimeout(loadAdd, 1000);
    }
}

function addSerch(type,response,url) {
  for (var i = 0; i < response.length; i++) {
     var block = $('#vehicalDetailContainerBlock').html();
     block = block.replace('PRICE',response[i].price);
     block = block.replace('BRAND',response[i].brand);
     block = block.replace('MODEL',response[i].model);
     block = block.replace('YEAR',response[i].year);
     block = block.replace('CONDITION',response[i].condition);
     block = block.replace('TRANSMISSTION',response[i].transmission);
     block = block.replace('FUEL',response[i].fuelType);
     block = block.replace('CAPACITY',response[i].capacity);
     block = block.replace('MILAGE',response[i].milage+" km");
     block = block.replace('PRICE',response[i].price);
     block = block.replace('ADDDRESS',response[i].address);
     block = block.replace('COMNAME',response[i].addtype);
     block = block.replace(/EMAILADDRESS/gi,response[i].email);
     block = block.replace('TEL',response[i].tel);
     block = block.replace(/IDNUM/gi,response[i].id);
     block = block.replace('SRC',"http://"+url+":8080/first/webapi/getImage?location="+response[i].location);
     if(isNaN(response[i].addtype)){
       block = block.replace('DISPLAY','');
     }
     else{
       block = block.replace('DISPLAY','displayHide');
     }
     $('.vehicalDetailContainer'+type+'Append').append(block);
   }
}

function moveProfilePage(email,comName) {
  localStorage.setItem("company", email);
  localStorage.setItem("companyName", comName);

  window.location.replace("./Profile.html");

}

function addComment(id) {
  var comment = $("#commentText"+id).val();

  if (comment.length !== 0) {

    var url;
    if (connetionOne == 'ok') {
      url = conOneUrl;
    }
    else if(connetionTwo == 'ok') {
      url = conTwoUrl;
    }
    else{
      $('#genralSettingsError').css('opacity','1');
      $('#genralSettingsError').html("try again later");
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
      commentText:comment,
      addId:id,
      key: localStorage.getItem("key"),
      id:localStorage.getItem("id"),
      dataEnterType:dataEnterType,
    };

    if (dataEnterType == 'both') {
      $.ajax({
         url: 'http://'+conOneUrl+':8080/first/webapi/insetrComment',
         type: "POST",
         data: dataset,
         cache: false,
         success: function(response) {
           console.log(response);

          if (response == "Done") {
            $.ajax({
               url: 'http://'+conTwoUrl+':8080/first/webapi/insetrComment',
               type: "POST",
               data: dataset,
               cache: false,
               success: function(response) {
                 if (response == 'Done') {
                   var block = $('#commentContanerBlock').html();
                   block = block.replace('NAME',"Me");
                   block = block.replace('COMMENT',comment);
                   block = block.replace('DATE',"now");
                   $('#commentContaner'+id).append(block);
                   $("#commentText"+id).val("");
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
         url: 'http://'+url+':8080/first/webapi/insetrComment',
         type: "POST",
         data: dataset,
         cache: false,
         success: function(response) {
           if (response == 'Done') {
             var block = $('#commentContanerBlock').html();
             block = block.replace('NAME',"Me");
             block = block.replace('COMMENT',comment);
             block = block.replace('DATE',"now");
             $('#commentContaner'+id).append(block);
             $("#commentText"+id).val("");
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
  }
}

function loadComment(url) {
  var dataset={
    key: localStorage.getItem("key"),
    id:localStorage.getItem("id"),
  };
  $.ajax({
    url: 'http://'+url+':8080/first/webapi/displayComment',
    method: "POST",
    data: dataset,
    //cache: false,
    dataType: 'json',
    success: function(response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        var block = $('#commentContanerBlock').html();
        block = block.replace('NAME',response[i].name);
        block = block.replace('COMMENT',response[i].commentText);
        block = block.replace('DATE',getDateAndTime(response[i].time));
        $('#commentContaner'+response[i].addId).append(block);
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("error"+xhr.responseText);
    }
  });
}
