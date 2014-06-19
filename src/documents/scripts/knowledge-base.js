$(function() {
    // For draggable main menu, check drag direction
    var start,
        stop;

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

    // Grid-Menu (L1-2) coloring of icons when hovering
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
        $("#nav").toggleClass("collapsed");

        if ($("#collapseToc").hasClass('minus')) {
            $("#collapseToc").removeClass('minus').addClass('plus');
            $("#main-container .col-md-9").removeClass("col-md-9").addClass("col-md-12");
        } else {
            $("#collapseToc").removeClass('plus').addClass('minus');
            $("#main-container .col-md-12").removeClass("col-md-12").addClass("col-md-9");
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

        start: function( event, ui ) {
            start = ui.position.top;
        },

        stop: function( event, ui ) {
            stop = ui.position.top;

            if (ui.position.top <= -236) {
                $(".cover").css('z-index',1000);
            }

            if ((start - stop) > 0) {
                // Menu Dragged Up
                $('#main-menu').css('top',-247);



            } else if ((start - stop) < 0) {

                // Menu Dragged Down
                $('#main-menu').css('top',0);
            }
        }
    });

    // Wait for menu collapse animation to end before re-shuffing z-indexes
    $("#main-menu").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
        if ($("#main-menu").css('top') === "-247px") {

            // Set site logo to be clickable link
            $(".cover").css('z-index',1000);
        }
    });


    //
    // Move article nav to header on scroll
    //

    var $hierarchyNav   = $("#hierarchy-nav"),
        articleNavTop   = $hierarchyNav.offset().top,
        $articlePosition= $("#knowledge-navbar .container"),
        $headerPosition = $("#main-container .row:first .col-md-9"),
        $window         = $(window),
        inHeader        = false;

    $window.on("scroll.article", function() {
        if ($hierarchyNav.length) {

            // If the article nav is scrolled out of view...
            if ($window.scrollTop() >= articleNavTop) {

                // If it's not in the header yet, move it there
                if (!inHeader) {
                    $hierarchyNav.prependTo($articlePosition);
                    inHeader = true;
                }

            // otherwise the article
            } else {

                if (inHeader) {
                    $hierarchyNav.appendTo($headerPosition);
                    inHeader = false;
                }
            }
        }
    });

});