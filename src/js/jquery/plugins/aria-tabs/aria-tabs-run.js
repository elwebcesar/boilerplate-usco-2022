export default function ariaTabsRun() {
    $(document).ready(function() {
      'use strict';
      $(window).on('ariaTabs.initialised', function(event, element) {
        // console.log(element + 'init');
      });

      $('.tab-group').ariaTabs({
        // contentRole: ['document', 'application', 'document'],
      });

      $(window).on('ariaTabs.select', function(event, element, index) {
        // console.log(index);
      });

      $(window).on('ariaTabs.deselect', function(event, element, index) {
        // console.log(index);
      });
    });
}
