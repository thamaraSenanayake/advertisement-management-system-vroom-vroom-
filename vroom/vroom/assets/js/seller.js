
$(document).ready(function(){
  loadAdd();
});

function loadAdd() {
    if(connetionOne == 'ok' || connetionTwo == 'ok'){
      var company = localStorage.getItem("company");
      console.log(company);
      var url;

      if(connetionTwo == 'ok') {
        url = conTwoUrl;
      }
      else if (connetionOne == 'ok') {
        url = conOneUrl;
      }
      var dataset ={
        id:company,
      };
      $.ajax({
        url: 'http://'+url+':8080/first/webapi/hatchbackSerchAdd',
        method: "POST",
        data:dataset,
        //cache: false,
        dataType: 'json',
        success: function(response) {
          console.log(response);
          displayAdd(response,'HatchbackInner','HatchbackContainer',url);
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log("error"+xhr.responseText);
        }
      });

      if (connetionOne == 'ok') {
        url = conOneUrl;
      }
      else if(connetionTwo == 'ok') {
        url = conTwoUrl;
      }

      $.ajax({
        url: 'http://'+url+':8080/first/webapi/sedanSerchAdd',
        method: "POST",
        data:dataset,
        //cache: false,
        dataType: 'json',
        success: function(response) {
          console.log(response);
          displayAdd(response,'SedanInner','SedanContainer',url);
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log("error"+xhr.responseText);
        }
      });

      if(connetionTwo == 'ok') {
        url = conTwoUrl;
      }
      else if (connetionOne == 'ok') {
        url = conOneUrl;
      }

      $.ajax({
        url: 'http://'+url+':8080/first/webapi/mPVSerchAdd',
        method: "POST",
        data:dataset,
        //cache: false,
        dataType: 'json',
        success: function(response) {
          console.log(response);
          displayAdd(response,'mpvInner','mpvContainer',url);
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log("error"+xhr.responseText);
        }
      });

      if (connetionOne == 'ok') {
        url = conOneUrl;
      }
      else if(connetionTwo == 'ok') {
        url = conTwoUrl;
      }
      $.ajax({
        url: 'http://'+url+':8080/first/webapi/sUVSerchAdd',
        method: "POST",
        data:dataset,
        //cache: false,
        dataType: 'json',
        success: function(response) {
          console.log(response);
          displayAdd(response,'suvInner','suvContainer',url);
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log("error"+xhr.responseText);
        }
      });

      console.log(dataset);

      $.ajax({
        url: 'http://'+url+':8080/first/webapi/userRatings',
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

      var coverPhotoData ={
        userID:company,
        type:"profile",
      };
      $.ajax({
         url: 'http://'+url+':8080/first/webapi/getCoverImage',
         method: "post",
         //cache: false,
         data: coverPhotoData,
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
      setTimeout(loadAdd, 250);
    }


}

function displayAdd(response,location,parent,url) {
  if (response.length == 0) {
    $('#'+parent).hide();

  }
  else{
    var height = 300 + 190*(Math.trunc(response.length/3));
    console.log(Math.trunc(response.length/3));
    $('#'+location).css("height",height);
    for (var i = 0; i < response.length; i++) {
      var block = $('#vehicalContainer').html();
      block = block.replace('TEXT',response[i].model+" Price: Rs "+response[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
      block = block.replace('TEL'," Tel: "+response[i].tel);
      block = block.replace('SRC',"http://"+url+":8080/first/webapi/getImage?location="+response[i].location);
      $('#'+location).append(block);
    }

  }
}
