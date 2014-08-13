/**
 * Created by lena on 8/11/14.
 */





$( document ).ready(function() {
  $(".timeline-tag").click(function() {
    var $selected = $(this).data("type");
    $("."+$selected+"-post").toggleClass("heightzero");
    $(this).toggleClass($selected+"-selected " + $selected+"-clear");
    $('.vertical-line').css('height',$('.wrapper').css('height')).css("height", "+=50");
    $(".no-posts").css("display" , "none");
    $(".soom-start").css("top","-65px;");
    if ($(".timeline-events:not(.heightzero)").length == 1) {
      setTimeout(function() { $(".no-posts").css("display" , "inline"); }, 800);
    }
  });
});

$("#clear-filter").click(function(){
  $('.timeline-tag').each(function() {
    var $selected = $(this).data("type");
    $(this).removeClass($selected+"-selected").addClass($selected+"-clear");
    $("."+$selected+"-post").addClass("heightzero");
    $(".no-posts").css("display" , "inline");
//    $(".soom-start").css("top" , "55px");
//    $(".vertical-line").css("height" , "70px");
  });
//  $('.timeline-events').hide();
});








//
//  $(".highway-selected").click(function () {
//    $(".highway-post").toggle();
//    $(this).toggleClass("highway-selected highway-clear")
//  });
//
//  $(".grow-selected").click(function () {
//    $(".grow-post").toggle();
//    $(this).toggleClass("grow-selected grow-clear")
//  });
//
//  $(".storefront-selected").click(function () {
//    $(".storefront-post").toggle();
//    $(this).toggleClass("storefront-selected storefront-clear")
//  });
//
//  $(".blogpost-selected").click(function () {
//    $(".blogpost-post").toggle();
//  $(this).toggleClass("blogpost-selected blogpost-clear")
//  });
//
//  $(".opensource-selected").click(function () {
//    $(".opensource-post").toggle();
//    $(this).toggleClass("opensource-selected opensource-clear")
//  });
//
//  $(".ios-selected").click(function () {
//    $(".ios-post").toggle();
//    $(this).toggleClass("ios-selected ios-clear")
//  });
//
//  $(".android-selected").click(function () {
//    $(".android-post").toggle();
//    $(this).toggleClass("android-selected android-clear")
//  });
//
//  $(".unity-selected").click(function () {
//    $(".unity-post").toggle();
//    $(this).toggleClass("unity-selected unity-clear")
//  });
//
//  $(".cocos2dx-selected").click(function () {
//    $(".cocos2dx-post").toggle();
//    $(this).toggleClass("cocos2dx-selected cocos2dx-clear")
//  });
//
//  $(".meetups-selected").click(function () {
//    $(".meetups-post").toggle();
//    $(this).toggleClass("meetups-selected meetups-clear")
//  });
//
//  $(".companyevents-selected").click(function () {
//    $(".companyevents-post").toggle();
//    $(this).toggleClass("companyevents-selected companyevents-clear")
//  });


