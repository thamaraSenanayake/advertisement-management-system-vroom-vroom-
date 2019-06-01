var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

$(document).ready(function(){
  loadAdd();

  $("#searchLink").click(function(event){
    $("#search").focus();
  });

  $("#search").keypress(function(event){
    if ( event.which == 13 ) {
      var search = $("#search").val();
      console.log(search);

      if (search.length===0) {
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
        console.log("error");
      }

      var dataset ={
        search:search
      };
      $.ajax({
        url: 'http://'+url+':8080/first/webapi/indexSerchAdd',
        method: "POST",
        data:dataset,
        dataType: 'json',
        success: function(response) {
          $('.containerOne').css('display','none');
          $('.containerTwo').css('display','none');
          $('.containerThree').css('display','none');

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
             block = block.replace('PRICE',"RS: "+response[i].price);
             block = block.replace('ADDDRESS',response[i].address);
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
             $('.vehicalDetailContainerAppend').append(block);
           }

        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log("error"+xhr.responseText);
        }
      });

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

      $.ajax({
        url: 'http://'+url+':8080/first/webapi/imageSliderAdd',
        method: "get",
        //cache: false,
        dataType: 'json',
        success: function(response) {
          console.log(response);
          $('#caption1').text(response[0].brand+" "+response[0].model+" price: Rs. "+response[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+" Tel: "+response[0].tel);
          $('#pic1').attr('src',"http://"+url+":8080/first/webapi/getImage?location="+response[0].location);
          $('#caption2').text(response[1].brand+" "+response[1].model+" price: Rs.  "+response[1].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+" Tel: "+response[1].tel);
          $('#pic2').attr('src',"http://"+url+":8080/first/webapi/getImage?location="+response[1].location);
          $('#caption3').text(response[2].brand+" "+response[2].model+" price: Rs:"+response[2].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+" Tel: "+response[2].tel);
          $('#pic3').attr('src',"http://"+url+":8080/first/webapi/getImage?location="+response[2].location);
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
      var dataset ={
        id:null,
      };
      $.ajax({
        url: 'http://'+url+':8080/first/webapi/hatchbackSerchAdd',
        method: "POST",
        data:dataset,
        //cache: false,
        dataType: 'json',
        success: function(response) {
          console.log(response);
          for (var i = 0; i < response.length; i++) {
            $('#hatchbackDescription'+i).text(response[i].model+" Price: Rs. "+response[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+" Tel: "+response[i].tel);
            $('#hatchbackImage'+i).attr('src',"http://"+url+":8080/first/webapi/getImage?location="+response[i].location);

          }
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
          for (var i = 0; i < response.length; i++) {
            $('#sedanDescription'+i).text(response[i].model+" Price: Rs "+response[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+" Tel: "+response[i].tel);
            $('#sedanImage'+i).attr('src',"http://"+url+":8080/first/webapi/getImage?location="+response[i].location);

          }
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
          for (var i = 0; i < response.length; i++) {
            $('#mpvDescription'+i).text(response[i].model+" Price: Rs. "+response[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+" Tel: "+response[i].tel);
            $('#mpvImage'+i).attr('src',"http://"+url+":8080/first/webapi/getImage?location="+response[i].location);

          }
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
          for (var i = 0; i < response.length; i++) {
            $('#suvDescription'+i).text(response[i].model+" Price: Rs. "+response[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+" Tel: "+response[i].tel);
            $('#suvImage'+i).attr('src',"http://"+url+":8080/first/webapi/getImage?location="+response[i].location);

          }
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

function moveProfilePage(email) {
  localStorage.setItem("company", email);

  window.location.replace("./seller.html");

}
