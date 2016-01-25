(function($) {
    var dev_trigger = ".devbuild-trigger",
        default_doc_title = document.title;

    // look out for click
    $(dev_trigger).each(function(){
        $(this).children('.text').text($(this).data('title'));
    }).click(function(e) {
        var $this = $(this),
            reset_time = $this.data('reset-time');
        e.preventDefault();
        if ($this.data("executing")) return false;

        $this.set_trigger("Building...", "loading");

        $.ajax({
            method: "POST",
            url: $this.data('link')
        })
        .done(function( data, textStatus, xhr ) {
            // remove classes
            $this.removeClass("loading");

            // search for any errors from returned data
            if (data.search("ERROR") > 0) {
                // change text to show an error has occured
                $this.attr('href', $this.data('link'))
                    .set_trigger("Build failed","error");
                setTimeout(function(){
                    $this.reset_trigger();
                }, reset_time);
            } else {
                // change text back to default
                changes = $().find("li[style='color: blue'], li[style='color: green'").length;
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
            .text($(this).data('title'));
    };

}(jQuery));
