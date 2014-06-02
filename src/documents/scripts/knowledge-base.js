$(function() {
    $("#nav").tocify({
        showAndHide:false,
        selectors: "h1, h2, h3",
        ignoreSelector: ".jumbotron"
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
    $(".tocify-header > li:first-child").prepend("<div id='collapse-container'><button id='collapseToc'>Test</button></div>");
    $('#collapseToc').click(function(e) {
        e.stopPropagation();
        $(".tocify-subheader").slideToggle(200);
    });
    $('#article-name').text($("#doc-container h1").text());
});