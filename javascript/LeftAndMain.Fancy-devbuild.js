(function($) {

    // inject the link into the cms menu
    $(".cms-menu-list").append('<li class="link devbuild"><a href="javascript:;" id="devbuild-trigger"><span class="icon icon-16 icon-help">&nbsp;</span><span class="text">Dev/Build</span></a></li>');

    // look out for click
    $("#devbuild-trigger").click(function() {
        // add loading class and update text
        $("#devbuild-trigger").addClass("loading");
        $("#devbuild-trigger .text").text("Buiding...");

        // Run the dev/build
        $.ajax({
            method: "POST",
            url: "dev/build"
        })
        .done(function( msg ) {
            // remove classes and change text back
            $("#devbuild-trigger").removeClass("loading");
            $("#devbuild-trigger .text").text("Dev/Build")
        });
    });

}(jQuery));
