(function($) {
    var dev_trigger = ".devbuild-trigger",
        all_states = "error loading success";
        default_doc_title = document.title;

    $.fn.set_trigger = function(message, current_class) {
        document.title = message;
        $(this)
            .removeClass(all_states)
            .data("executing", true)
            .addClass(current_class)
            .children(".text")
            .text(message);
    };

    $.fn.reset_trigger = function() {
        document.title = default_doc_title;
        $(this).attr('href', '#')
            .removeClass(all_states)
            .removeData("executing")
            .children(".text")
            .text($(this).data('title'));
    };

    function completion_handler(data, handler_option){
        if (handler_option){
            switch (handler_option) {
                //case 'log':
                //    break;
                // case 'popup':
                //     dialog.ssdialog({iframeUrl: this.attr('href'), autoOpen: true, dialogExtraClass: extraClass});
                //    break;
                case 'newtab':
                    // Display error in new tab/window
                    with(window.open('about:blank').document) {
                        open();
                        write(data);
                        close();
                    }
                    break;
                case 'ignore':
                default:
                    break;
            }
        }
    }

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
            // search for any errors from returned data
            if ($(data).find($this.data('error-markup')).length > 0) {
                completion_handler(data, $this.data('error-handler'));
                // change text to show an error has occured
                $this.attr('href', $this.data('link'))
                    .set_trigger("Build failed", "error");
                setTimeout(function(){
                    $this.reset_trigger();
                }, reset_time);
            } else {
                completion_handler(data, $this.data('success-handler'));
                // change text back to default
                changes = $(data).find($this.data('success-markup')).length;
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
            setTimeout(function(){
                $this.reset_trigger();
            }, reset_time);
        });

        return false;
    });

}(jQuery));
