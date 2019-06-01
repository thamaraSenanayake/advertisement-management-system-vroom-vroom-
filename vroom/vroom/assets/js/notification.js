$(document).ready (function(){
  loadAdd();
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
          $('.commentContanerAppend').empty();
          for (var i = 0; i < response.length; i++) {
            var block = $('#commentContanerBlock').html();
            block = block.replace('NAME',response[i].name);
            block = block.replace('COMMENT',response[i].commentText);
            block = block.replace('DATE',getDateAndTime(response[i].time));

            $('.commentContanerAppend').append(block);
          }
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log("error"+xhr.responseText);
        }
      });


    }else{
      setTimeout(loadAdd, 250);
    }
}
