$(function() {

    // Initialize Table Of Contents
    $("#nav").tocify({
        showAndHide:false,
        selectors: "h1, h2, h3",
        ignoreSelector: ".jumbotron, footer",
        extendPage: false
    });

    // Initialize Dropdown Navigation Instances
    $('.dropdown-toggle').dropdown();

    // Dropdown menu animations
    $('.dropdown').on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').show();
    });

    // Dropdown menu animations
    $('.dropdown').on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').hide();
    });

    // Grid-Menu (L3) coloring of icons when hovering
    $('div.menu-option').hover(function(){
        $(this).find(".option-head-text").addClass("hover");
        $(this).find("img").addClass("hover");
    }, function(){
        $(this).find(".option-head-text").removeClass("hover");
        $(this).find("img").removeClass("hover");
    });

    /*
     *  Add -/+ collapse option for Table Of Contents
     */
    $(".tocify-header > li:first-child").prepend("<div id='collapse-container'> <span id='collapseToc' class='minus'> </span></div>");
    $('#collapse-container').click(function(e) {
        e.stopPropagation();
        $(".tocify-subheader").slideToggle(200);
        if ($("#collapseToc").hasClass('minus')) {
            $("#collapseToc").removeClass('minus').addClass('plus');
        } else {
            $("#collapseToc").removeClass('plus').addClass('minus');
        }
    });

    // Set L3-Menu as Article Name On Top Of Article
    $('#article-name').text($("#doc-container h1").text());

    // Hover Over Navigation Menus
    $('.dropdown-toggle').mouseenter(function(){
//        $(this).click();
    }).mouseleave(function(){
    });

    // set cross-site menu to be draggable
    $('#main-menu').draggable({
        axis:"y",
        containment: "#main-menu-container",
        stack:"div",

        // Set
        stop: function( event, ui ) {
            if (ui.position.top <= -236) {
                $(".cover").css('z-index',1000);
            }
        }
    });


});