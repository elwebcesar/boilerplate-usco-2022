export default function smartmenus($mainMenu,$mainMenuState,$mainMenuSecond) {

  // const $mainMenu = $('#main-menu');
  // const $mainMenuState = $('#main-menu-state');
  // const $mainMenuSecond = $('#second-menu');


  $(function() {
    // $('#main-menu').smartmenus({
    $mainMenu.smartmenus({
      subMenusSubOffsetX: 1,
      subMenusSubOffsetY: -8
    });
    $mainMenu.smartmenus('keyboardSetHotkey', '123', 'shiftKey');

    if ($mainMenuSecond.length) {
      $mainMenuSecond.smartmenus({
        subMenusSubOffsetX: 1,
        subMenusSubOffsetY: -8
      });
      $mainMenuSecond.smartmenus('keyboardSetHotkey', '123', 'shiftKey');
    }
  });

	if ($mainMenuState.length) {
		// animate mobile menu
		$mainMenuState.change(function(e) {
      console.log('66', $mainMenu)
			if (this.checked) {
				$mainMenu.hide().slideDown(250, function() { $mainMenu.css('display', ''); });
			} else {
				$mainMenu.show().slideUp(250, function() { $mainMenu.css('display', ''); });
			}
		});

		// hide mobile menu beforeunload
		$(window).bind('beforeunload unload', function() {
			if ($mainMenuState[0].checked) {
				$mainMenuState[0].click();
			}
		});
	};
}
