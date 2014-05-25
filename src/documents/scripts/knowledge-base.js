$(function() {
    $("#nav").tocify({
        showAndHide:false,
        selectors: "h1, h2, h3"
    });
    $('.dropdown-toggle').dropdown();

    $('.dropdown').on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    });

    // ADD SLIDEUP ANIMATION TO DROPDOWN //
    $('.dropdown').on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
    });
});