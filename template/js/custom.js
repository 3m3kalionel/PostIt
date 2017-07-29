$(document).ready(() => {
  $('body').on('click', '.button-collapse', function(){
    $(this).sideNav();
  });
  $(".button-collapse").sideNav();
  $('.modal').modal();
});
