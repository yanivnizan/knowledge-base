$(function() {

    // Set option heights to max to keep grid shape
    var maxHeight = 0;
    $(".menu-option").each(function(){
        if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
    });
    $(".menu-option").height(maxHeight);

    // Initialize Table Of Contents
    $("#nav").tocify({
        showAndHide:false,
        selectors: "h1, h2, h3",
        ignoreSelector: ".jumbotron, footer",
        scrollTo: 130, // === $("#hierarchy-nav").offset().top
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
    var     tocInHeader = false,
            $navbar = $("#tocify-header0");

    $(".tocify-header > li:first-child").prepend("<div id='collapse-container'> <span id='collapseToc' class='minus'> </span></div>");
    $('#collapse-container').click(function(e) {
        e.stopPropagation();
        $(".tocify-subheader").slideToggle(20);
        $("#nav").toggleClass("collapsed");
        $navbar.toggleClass("collapsed");
        if ($("#collapseToc").hasClass('minus')) {

            // Pin collapsed toc to header
            $navbar.appendTo($("#header-right"));
            tocInHeader = true;

            // Replace 'collapse' with 'expand' button
            $("#collapseToc").removeClass('minus').addClass('plus');

            // Expand doc view
            $("#main-container .col-md-8").removeClass("col-md-8").addClass("col-md-12");
        } else {

            // Bring back toc down
            $('#tocify-header0 > li:first-of-type a').text($('#article-name').text());

            // pin back to normal view
            $navbar.prependTo($("#nav"));
            tocInHeader = false;

            // Replace 'expand' with 'collapse' button
            $("#collapseToc").removeClass('plus').addClass('minus');

            // Restrict doc view
            $("#main-container .col-md-12").removeClass("col-md-12").addClass("col-md-8");
        }
    });

    // Set L3-Menu as Article Name On Top Of Article
    $('#article-name').text($("#doc-container h1").text());


    //
    // Expand \ collapse main menu
    //

    var $html               = $("html"),
        $mainMenu           = $("#main-menu"),
        isMainMenuExpanded  = false,
        collapseMainMenu    = function() {
            $mainMenu.removeClass("expanded");
            isMainMenuExpanded = false;
        };

    $("#main-menu-tab").click(function(event) {
        event.stopPropagation();

        // If menu is collapsed, expand it and listen to external clicks
        if (!isMainMenuExpanded) {
            $mainMenu.addClass("expanded");
            $html.one("click.soomlaMainMenu", collapseMainMenu);
            isMainMenuExpanded = true;

        } else {

            // If menu is expanded, stop listening to external clicks and collapse
            $html.off("soomlaMainMenu");
            collapseMainMenu();
        }
    });



    //
    // Move article nav to header on scroll
    //

    var $hierarchyNav = $("#hierarchy-nav");

    if ($hierarchyNav.length) {
        var articleNavTop   = $hierarchyNav.offset().top,
            $articlePosition= $("#knowledge-navbar .container"),
            $headerPosition = $("#main-container .row:first .col-md-9"),
            $window         = $(window),
            inHeader        = false,
            levelTwoNav     = $("#jumbo-main-text").length;

            if (levelTwoNav) {
                $headerPosition = $("#jumbo-main-text");
            }
        $window.on("scroll.article", function() {

            // If navbar is in header, change title to current viewed section
            if (tocInHeader) {
                $('#tocify-header0 > li:first-of-type a').text($(".tocify-item.active").text());
            }

            if ($hierarchyNav.length) {

                // If the article nav is scrolled out of view...
                if ($window.scrollTop() >= articleNavTop) {

                    // If it's not in the header yet, move it there
                    if (!inHeader) {
                        $hierarchyNav.prependTo($('#header-right'));
                        inHeader = true;
                    }

                    // otherwise the article
                } else {

                    if (inHeader) {
                        if (levelTwoNav) {
                            $hierarchyNav.prependTo($headerPosition);
                            inHeader = false;
                        } else {
                            $hierarchyNav.appendTo($headerPosition);
                            inHeader = false;
                        }
                    }
                }
            }
        });
    }
});