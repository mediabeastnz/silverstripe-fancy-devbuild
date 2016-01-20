(function($) {

    // inject the link into the cms menu
    $(".cms-menu-list").append('<li class="link devbuild"><a href="#" id="devbuild-trigger"><span class="icon icon-16 icon-help">&nbsp;</span><span class="text">Dev/Build</span></a></li>');

    // look out for click
    $("#devbuild-trigger").click(function(e) {

        e.preventDefault();

        $("#devbuild-trigger").removeClass("error");
        $("#devbuild-trigger").addClass("loading");
        $("#devbuild-trigger .text").text("Building...");

        $.ajax({
            method: "POST",
            url: "dev/build"
        })
        .done(function( data, textStatus, xhr ) {
            // remove classes
            $("#devbuild-trigger").removeClass("loading");

            // search for any errors from returned data
            if (data.search("ERROR") > 0) {
                // change text to show an error has occured
                $("#devbuild-trigger").attr('href', 'dev/build').attr('target', '_blank');
                $("#devbuild-trigger .text").text("Build Failed");
                $("#devbuild-trigger").addClass("error");
                // revert to default after 5 seconds
                setTimeout(function(){
                    $("#devbuild-trigger .text").text("Dev/Build");
                    $("#devbuild-trigger").attr('href', '#');
                    $("#devbuild-trigger").removeClass("error");
                }, 5000);
            } else {
                // change text back to default
                $("#devbuild-trigger .text").text("Build Successful");

                // reload CMS
                 $('.cms-container').entwine('ss').reloadCurrentPanel();

                // revert to default after 5 seconds
                setTimeout(function(){
                    $("#devbuild-trigger .text").text("Dev/Build");
                }, 5000);
            }
        });

        return false;
    });

}(jQuery));
