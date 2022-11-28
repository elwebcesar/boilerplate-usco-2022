import { include } from '../functions/include';

import smartmenus from './plugins/smartmenus/smartmenus-run';

export default function exectPlugins() {

  const $mainMenu = $('#main-menu');
  const $mainMenuState = $('#main-menu-state');
  const $mainMenuSecond = $('#second-menu');


  const runSmartmenus = () => {
    // alert($mainMenu)
    smartmenus($mainMenu,$mainMenuState,$mainMenuSecond);
  }

  include('./jquery/plugins/jquery.smartmenus.min.js',runSmartmenus());


  
  
  $(document).ready(function(){
    console.log('exectPlugins');

    // include('./jquery/plugins/jquery.smartmenus.min.js');
    // include('./jquery/plugins/jquery.smartmenus.min.js',runSmartmenus());
    // include('./jquery/plugins/jquery.smartmenus.keyboard.min.js');

    include('./jquery/plugins/aria-tabs.js');
    include('./jquery/plugins/responsive-tabs.js');

    if ($mainMenu.length) {
      // smartmenus($mainMenu,$mainMenuState,$mainMenuSecond);
    }

    if ($('.responsive-tabs').length) {
      responsiveTabsRun();
    }    

    if ($('.tab-group').length) {
      ariaTabsRun();
    }
  });
}

