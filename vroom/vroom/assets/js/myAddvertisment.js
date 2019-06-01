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

  $("#modelClose").click(function(){
      $('#deleteAddModel').css('display','none');
  });

  $(".containerNoBtn").click(function(){
      $('#deleteAddModel').css('display','none');
  });

  $(".containerYesBtn").click(function(){
    $('#deleteAddModel').css('display','none');
    var dataEnterType;

    if (connetionOne == 'ok' && connetionTwo == 'ok') {
      dataEnterType = 'both';
    } else {
      dataEnterType = 'onlyThis';
    }

    var dataset = {
       key: localStorage.getItem("key"),
       id:localStorage.getItem("id"),
       deleteAddvertisment:localStorage.getItem('deleteAddvertisment'),
       dataEnterType:dataEnterType,
    };

    if (dataEnterType == 'both') {
      console.log("both");
      $.ajax({
         url: 'http://'+conOneUrl+':8080/first/webapi/deleteAdd',
         method: "post",
         //cache: false,
         data: dataset,
         // dataType: 'json',
         success: function(responseOne) {
           console.log(responseOne);
           responseOne = responseOne.split(",");
           console.log(responseOne);
           if (responseOne == 'done') {
             $.ajax({
                url: 'http://'+conTwoUrl+':8080/first/webapi/deleteAdd',
                method: "post",
                //cache: false,
                data: dataset,
                // dataType: 'json',
                success: function(response) {
                  console.log(response);
                  if (response == 'done') {
                    $('#vehicalDetailContainer'+localStorage.getItem("deleteAddvertisment")).fadeOut();
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

    } else {
      console.log("only this");
      if (connetionOne == 'ok') {
        deleteAddFuncton(dataset,conOneUrl);
      } else if (connetionTwo == 'ok') {
        deleteAddFuncton(dataset,conTwoUrl);
      }
      else{
        $('#dbErrorSign').css('opacity','1');
        $('#dbErrorSign').html("try again later");
      }
    }
  });

});


function loadAdd() {
    if(connetionOne == 'ok' || connetionTwo == 'ok'){
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
      };
      $.ajax({
        url: 'http://'+url+':8080/first/webapi/displayMyAdd',
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
            block = block.replace('CAPACITY',response[i].capacity+" cc");
            block = block.replace('MILAGE',response[i].milage+" km");
            var price = response[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            block = block.replace('PRICE',price);
            block = block.replace(/IDNUM/gi,response[i].id);
            block = block.replace('SRC',"http://"+url+":8080/first/webapi/getImage?location="+response[i].location);

            $('.vehicalDetailContainerAppend').append(block);

           }
           if (response.length == 0) {
             $('.vehicalDetailContainerAppend').text("No addvertisment to show");
           }
           else{
             loadComment(url);
           }
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log("error"+xhr.responseText);
        }
      });

    }else{
      console.log("else");
      setTimeout(loadAdd, 250);
    }
}


function editAdd(id) {
  localStorage.setItem("editAddvertisment",id);
  window.location.href = "editAddvertisment.html";
}

function deleteAdd(id) {
  localStorage.setItem("deleteAddvertisment",id);
  $('#deleteAddModel').css('display','block');
}

function deleteAddFuncton(dataset,url){
  $.ajax({
     url: 'http://'+url+':8080/first/webapi/deleteAdd',
     method: "post",
     //cache: false,
     data: dataset,
     // dataType: 'json',
     success: function(response) {
       console.log(response);
       if (response == 'done') {
         $('#vehicalDetailContainer'+localStorage.getItem("deleteAddvertisment")).fadeOut();
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
                   block = block.replace('NAME',"ME");
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
             block = block.replace('NAME',"ME");
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
    url: 'http://'+url+':8080/first/webapi/displayMyComment',
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
