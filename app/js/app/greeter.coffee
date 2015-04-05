define ->
    class Greeter
        constructor: (@element) ->
            @element.innerText += 'The time is: '
            @span = document.createElement('span')
            @span = $("<span/>")
            @span.appendTo(@element)
            @span.text(new Date().toUTCString())
        start: ->
            span = @span
            @timerToken = setInterval ->
                span.text(new Date().toUTCString())
            , 500
            $('div').click ->
                color = $(this).css("background-color");
                $("#result").html("That div is " + color + ".");

        stop: ->
            clearTimeout(this.timerToken);

    Greeter: Greeter