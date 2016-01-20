(function($) {
    var $dev_trigger = $("#devbuild-trigger"),
        reset_time = 5000;
    // inject the link into the cms menu
    $(".cms-menu-list").append('<li class="link devbuild"><a href="#" id="devbuild-trigger"><span class="icon icon-16 icon-help">&nbsp;</span><span class="text">Dev/Build</span></a></li>');

    // look out for click
    $dev_trigger.click(function(e) {

        e.preventDefault();

        $dev_trigger.removeClass("error")
            .addClass("loading")
            .children(".text")
            .text("Building...");

        $.ajax({
            method: "POST",
            url: "dev/build"
        })
        .done(function( data, textStatus, xhr ) {
            // remove classes
            $dev_trigger.removeClass("loading");

            // search for any errors from returned data
            if (data.search("ERROR") > 0) {
                // change text to show an error has occured
                $dev_trigger.attr('href', 'dev/build')
                    .attr('target', '_blank')
                    .addClass("error")
                    .children(".text")
                    .text("Build Failed");
                // revert to default after 5 seconds
                setTimeout(function(){
                    $dev_trigger.attr('href', '#')
                        .removeClass("error")
                        .children(".text")
                        .text("Dev/Build");
                }, reset_time);
            } else {
                // change text back to default
                $("#devbuild-trigger .text").text("Build Successful");

                // reload CMS
                 $('.cms-container').entwine('ss').reloadCurrentPanel();

                // revert to default after 5 seconds
                setTimeout(function(){
                    $("#devbuild-trigger .text").text("Dev/Build");
                }, reset_time);
            }
        });

        return false;
    });

}(jQuery));
