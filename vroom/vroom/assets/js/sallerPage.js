$(document).ready (function(){

  loadAdd();

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

      var url;
      if (connetionOne == 'ok') {
        url = conOneUrl;
      }
      else if(connetionTwo == 'ok') {
        url = conTwoUrl;
      }
      else{
        console.log("error");
        return;
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
          console.log(response);
          $('.vehicalDetailContainerAppend').empty();

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
            block = block.replace('MILAGE',response[i].milage);
            block = block.replace('PRICE',response[i].price);
            block = block.replace(/IDNUM/gi,response[i].id);
            block = block.replace('SRC',"http://"+url+":8080/first/webapi/getImage?location="+response[i].location);

            if (response[i].type == 'sedan') {
                $('#SedanContainerAppend').append(block);
                $('#SedanContainer').removeClass("displayHide");
            }
            else if (response[i].type == 'hatchback') {
                $('#HatchbackContainerAppend').append(block);
                $('#HatchbackContainer').removeClass("displayHide");
            }
            else if (response[i].type == 'mpv') {
                $('#MVPContainerAppend').append(block);
                $('#MVPContainer').removeClass("displayHide");
            }

            else if (response[i].type == 'SUV') {
                $('#SUVContainerAppend').append(block);
                $('#SUVContainer').removeClass("displayHide");
            }

           }
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log("error"+xhr.responseText);
        }
      });

      var dataset
      $.ajax({
        url: 'http://'+url+':8080/first/webapi/myRatings',
        method: "POST",
        data:dataset,
        //cache: false,
        success: function(response) {
          console.log(response);
          response = response.split(',');
          $('.positiveNum').text(response[0]);
          $('.neagativeNum').text(response[1]);
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log("error"+xhr.responseText);
        }
      });

      var coverImageData ={
        userID: localStorage.getItem("id"),
        type:"sallerPage",
      };
      console.log(coverImageData);
      $.ajax({
         url: 'http://'+url+':8080/first/webapi/getCoverImage',
         method: "post",
         //cache: false,
         data: coverImageData,
         // dataType: 'json',
         success: function(response) {
           console.log(response);
           $('#coverPhoto').attr('src',"http://"+url+":8080/first/webapi/getImage?location="+response);
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
      console.log("else");
      setTimeout(loadAdd, 1000);
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
