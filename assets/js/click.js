$(document).ready(function(){
  var picker = new Lightpick({ field: document.getElementById('datepicker') });
  $("input[name='counter']").counter({
      callback: function (values) {
          console.log(values);
      }
  });
  $('.container_search').click(function () {
    $('.container_main').toggleClass("container_main_clicked", true) ;
   });
   $("div.counter.display").click(function () {
     $('.container_section_destinations').css({
       'display':'none'
         });
         $('.container_main_clicked').toggleClass("container_main_clicked_blure", true) ;
});
$("input[id='datepicker']").click(function () {
  $(this).css({'color':'#008980'});
  $('.container_section_destinations').css({
    'display':'none'
      });
      $('.container_main_clicked').toggleClass("container_main_clicked_blure", true) ;
});


});
