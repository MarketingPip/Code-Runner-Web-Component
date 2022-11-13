window.addEventListener('load', (event) => {
    
const web_compontents = document.querySelectorAll('[code-runner-component]');

web_compontents.forEach((web_compontent) => t(web_compontent));    

 function t(b){   
     
     // store pre-defined code to run
   let preDefinedCode =  b.querySelector("#codetorun").innerHTML   
   // clear text from html 
   b.querySelector("#codetorun").innerHTML = ""
   b.querySelector("#codetorun").className = '';
      b.querySelector("#codetorun").removeAttribute("contenteditable")
     
var term = $(b.querySelector("#codetorun")).terminal(function(command) {
    console.log(command)
    php.execute('<?php ' + command);
}, {
    greetings: 'Interactive PHP shell\n',
    name: 'php',
    prompt: 'php > ' // same as linux exec
});

// PHP to string magic method
$.fn.__toString = function() {
    return `#<jQuery(${this.length})>`;
};

$.terminal.syntax('php')

var php = uniter.createEngine('PHP');
php.getStdout().on('data', function (text) {
    term.echo(text);
});
php.getStderr().on('data', function(text) {
    term.error(text);
});

php.expose(term, 'term');
php.expose($, 'jQuery');
 php.execute('<?php ' +  preDefinedCode);

   }
                     
                 
});