(function($) {
    var dev_trigger = ".devbuild-trigger",
        reset_time = 5000,
        default_doc_title = document.title;
    // inject the link into the cms menu
    $(".cms-menu-list").append('<li class="link devbuild"><a href="#" class="devbuild-trigger"><span class="icon icon-16">&nbsp;</span><span class="text">Dev/Build</span></a></li>');

    // look out for click
    $(dev_trigger).click(function(e) {
        var $this = $(this);
        e.preventDefault();
        if ($this.data("executing")) return false;

        $this.set_trigger("Building...","loading");

        $.ajax({
            method: "POST",
            url: "dev/build"
        })
        .done(function( data, textStatus, xhr ) {
            // remove classes
            $this.removeClass("loading");

            // search for any errors from returned data
            if (data.search("ERROR") > 0) {
                // change text to show an error has occured
                $this.attr('href', 'dev/build')
                    .set_trigger("Build failed","error");
                setTimeout(function(){
                    $this.reset_trigger();
                }, reset_time);
            } else {
                // change text back to default
                changes = $().find("li[style='color: blue'").length;
                $this.set_trigger(changes+" Changes occurred","success");
                setTimeout(function(){
                    $this.reset_trigger();
                    // reload CMS
                    $('.cms-container').entwine('ss').reloadCurrentPanel();
                }, reset_time);
            }
        })
        .fail(function( xhr, textStatus, errorThrown ) {
            $this.set_trigger("Request failed: "+errorThrown,"error");
        });

        return false;
    });

    $.fn.set_trigger = function(message, current_class) {
        document.title = message;
        $(this)
            .removeClass("error loading success")
            .data("executing", true)
            .addClass(current_class)
            .children(".text")
            .text(message);
    };

    $.fn.reset_trigger = function() {
        document.title = default_doc_title;
        $(this).attr('href', '#')
            .removeClass("error loading success")
            .removeData("executing")
            .children(".text")
            .text("Dev/Build");
    };

}(jQuery));
