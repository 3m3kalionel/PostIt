$(document).ready(() => {
//     $(".dropdown-button").dropdown({ hover: true });
//     $(".button-collapse").sideNav();
//     $('.collapsible').collapsible();
//     $('.modal').modal();


// // index2.html


//   $('.button-collapse').sideNav({
//       menuWidth: 300, 
//       edge: 'right', 
//       closeOnClick: true, 
//       draggable: true, 
//       onOpen: function(el) {}

//     })
//     $(".btn-floating").sideNav();
    $('body').on('click', '.button-collapse', function(){
        $(this).sideNav();
    });
    $(".button-collapse").sideNav();
    $('.modal').modal();
});