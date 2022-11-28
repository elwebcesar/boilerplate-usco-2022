
//-----------------------------------------------------------------
// LOAD JQUERY
// https://stackoverflow.com/questions/1140402/how-to-add-jquery-in-js-file
//-----------------------------------------------------------------

var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
// script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
script.src = "./jquery/jquery-3.6.0.min.js";

// Then bind the event to the callback function.
// There are several events for cross browser compatibility.
script.onreadystatechange = handler;
script.onload = handler;

// Fire the loading
head.appendChild(script);

import { test1 } from './test1';
import { xxxx } from './xxxxx';
// import '../../js/jquery/plugins/aria-tabs/aria-tabs.js';
// import '../../js/jquery/plugins/responsive-tabs/responsive-tabs.js';

function handler(){
    console.log('jquery added :)');

    // $(document).ready(function(){
    //   $("button").click(function(){
    //     $("div").animate({
    //       height: 'toggle'
    //     });
    //   });
    // });

    test1();
    xxxx();
    
    console.log('//')

}


