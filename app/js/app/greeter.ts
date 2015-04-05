/// <reference path="jquery.d.ts" />
export class Greeter {
    element:HTMLElement;
    span:HTMLElement;
    timerToken:number;

    constructor(element:HTMLElement) {
        this.element = element;
        this.element.innerText += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerText = new Date().toUTCString(), 500);
        $( "div" ).click(function() {
            var color = $( this ).css( "background-color" );
            $( "#result" ).html( "That div is " + color + "." );
        });
    }

    stop() {
        clearTimeout(this.timerToken);
    }


}