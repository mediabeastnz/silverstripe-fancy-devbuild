(function($) {
    var dev_trigger = ".devbuild-trigger",
        default_doc_title = document.title,
        trigger_classes = "error loading success",
        executing = "executing",
        text_class = '.text';

    $(dev_trigger).each(function(){
        $(this).children(text_class).text($(this).data('title'));
    }).click(function(event) {// look out for click
        event.preventDefault();
        var $this = $(this),
            reset_time = $this.data('reset-time');

        if ($this.data(executing)) return false;

        $this.set_trigger("Building...", "loading");

        $.ajax({
            method: "POST",
            url: $this.data('link')
        })
        .done(function( data, textStatus, xhr ) {
            // search for any errors from returned data
            if (data.search("ERROR") > 0) {
                // change text to show an error has occured
                $this.attr('href', $this.data('link'))
                    .set_trigger("Build failed", "error");
                setTimeout(function(){
                    $this.reset_trigger();
                }, reset_time);
            } else {
                // change text back to default
                changes = $(data).find("li[style='color: blue'], li[style='color: green']").length;
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
            .removeClass(trigger_classes)
            .data(executing, true)
            .addClass(current_class)
            .children(text_class)
            .text(message);
    };

    $.fn.reset_trigger = function() {
        document.title = default_doc_title;
        $(this)
            .removeClass(trigger_classes)
            .removeData(executing)
            .children(text_class)
            .text($(this).data('title'));
    };

}(jQuery));;
