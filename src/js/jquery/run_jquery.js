
import { include } from '../functions/include';

const head = document.getElementsByTagName('head')[0];
const script = document.createElement('script');

// script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
// script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
script.src = "./jquery/jquery-3.6.0.min.js";
script.type = 'text/javascript';
script.defer = true;
// script.async = true;

script.onreadystatechange = handler;
script.onload = handler;

head.appendChild(script);


// IMPORTS
import smartmenus from './plugins/smartmenus/smartmenus-run';
import ariaTabsRun from './plugins/aria-tabs/aria-tabs-run';
import responsiveTabsRun from './plugins/responsive-tabs/responsive-tabs-run';


// HANDLER
function handler(){
    // console.log('jquery added :)');

    window.onload = function() {
      if (!window.jQuery) {
        // jQuery is not loaded
        // console.log("Doesn't Work");
        location.reload();
      }
      else {
        // jQuery is loaded
        // console.log("Yeah!");

        $(document).ready(function(){
          // console.log('dentro jQuery');

          const $mainMenu = $('#main-menu');
          const $mainMenuState = $('#main-menu-state');
          const $mainMenuSecond = $('#second-menu');
    
          if ($mainMenu.length) {
            // include('./jquery/plugins/jquery.smartmenus.min.js');
            include('./jquery/plugins/jquery.smartmenus.keyboard.min.js');
            smartmenus($mainMenu,$mainMenuState,$mainMenuSecond);
          }

            // Checkbox Hack with Keyboard Accessibility
            const toggleCheckbox = document.querySelector('#main-menu-state');
            const toggleInterface = document.querySelector('.main-menu-btn');

            function handleToggle(e) {
              if(e.keyCode == 32 || e.keyCode == 13){
                toggleCheckbox.checked = !toggleCheckbox.checked;
              }
            }

            toggleInterface.addEventListener('keydown', handleToggle);

          // include('./jquery/plugins/aria-tabs.js');
          include('./jquery/plugins/responsive-tabs.js');
          if ($('.responsive-tabs').length) {
            responsiveTabsRun();
          }    
    
          if ($('.tab-group').length) {
            ariaTabsRun();
          }
        });
      }
    }
}
