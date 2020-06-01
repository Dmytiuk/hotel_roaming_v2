$(document).ready(function(){
  var picker = new Lightpick({ field: document.getElementById('datepicker') });
  $("input[name='NCS']").NCS({

      callback: function (values) {
          console.log(values);
      }
  });
  $('.container_search').click(function () {
    $('.container_main').toggleClass("container_main_clicked", true) ;
   });
   $("div.NCS.display").click(function () {
     $('.container_section_destinations').css({
       'display':'none'
         });
         $('.container_main_clicked').toggleClass("container_main_clicked_blure", true) ;
});
$("input[id='datepicker']").click(function () {
  $('.container_section_destinations').css({
    'display':'none'
      });
      $('.container_main_clicked').toggleClass("container_main_clicked_blure", true) ;
});


});
