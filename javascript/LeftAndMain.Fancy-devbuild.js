(function($) {
    var dev_trigger = "#devbuild-trigger",
        reset_time = 5000,
        default_doc_title = document.title;
    // inject the link into the cms menu
    $(".cms-menu-list").append('<li class="link devbuild"><a href="#" id="devbuild-trigger"><span class="icon icon-16 icon-help">&nbsp;</span><span class="text">Dev/Build</span></a></li>');

    // look out for click
    $(dev_trigger).click(function(e) {

        e.preventDefault();

        $(dev_trigger).set_trigger("Building...","loading");

        $.ajax({
            method: "POST",
            url: "dev/build"
        })
        .done(function( data, textStatus, xhr ) {
            // remove classes
            $(dev_trigger).removeClass("loading");

            // search for any errors from returned data
            if (data.search("ERROR") > 0) {
                // change text to show an error has occured
                $(dev_trigger).attr('href', 'dev/build')
                    .set_trigger("Build failed","error");
                setTimeout(function(){
                    $(dev_trigger).reset_trigger();
                }, reset_time);
            } else {
                // reload CMS
                $('.cms-container').entwine('ss').reloadCurrentPanel();
                // change text back to default
                $(dev_trigger).set_trigger("Build Successful","success");
                setTimeout(function(){
                    $(dev_trigger).reset_trigger();
                }, reset_time);
            }
        })
        .fail(function( xhr, textStatus, errorThrown ) {
            $(dev_trigger).set_trigger("Request failed: "+errorThrown,"error");
        });

        return false;
    });

    $.fn.set_trigger = function(message, current_class) {
        document.title = message;
        $(this)
            .removeClass("error loading success")
            .addClass(current_class)
            .children(".text")
            .text(message);
    };

    $.fn.reset_trigger = function() {
        document.title = default_doc_title;
        $(this).attr('href', '#')
            .removeClass("error loading success")
            .children(".text")
            .text("Dev/Build");
    };

}(jQuery));
