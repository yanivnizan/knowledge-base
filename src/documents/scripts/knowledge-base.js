$(function() {
    $("#nav").tocify({
        showAndHide:false,
        selectors: "h1, h2, h3"
    });
    $('.dropdown-toggle').dropdown();

    $('.dropdown').on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(200);
    });

    $('.dropdown').on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
    });
    $('div.menu-option').hover(function(){
        $(this).find(".option-head-text").addClass("hover");
        $(this).find("img").addClass("hover");
    }, function(){
        $(this).find(".option-head-text").removeClass("hover");
        $(this).find("img").removeClass("hover");
    });
    $(".tocify-header > li:first-child").append("<div><button id='collapseToc'>Test</button></div>");
    $('#collapseToc').click(function() {
        $(".tocify-subheader").toggle();
    });
});