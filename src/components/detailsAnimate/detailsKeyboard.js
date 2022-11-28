const keycode = {
  top: 38,
  left: 37,
  right: 39,
  bottom: 40
};

export const detailsKeyboard = elementsGroup => {
  // console.log(elementsGroup);

  elementsGroup.addEventListener('keydown', onKeyDown);

  function onKeyDown(e) {
    // console.log('keydown'+e.keyCode);

    // elementsGroup.querySelectorAll('details summary').forEach((detail) => {
    //   console.log('detail: ', detail)
    //   // detail.classList.remove("active");
    //   detail.classList.add("active-------");
    // });

    const element = document.activeElement;
    // console.log('activeElement: ', element.textContent)
    // console.log('element.nodeName: ', element.textContent);
    // console.log('nextElementSibling element: ', element.nextElementSibling.nodeName)
    // console.log('nextSibling element: ', element.nextSibling.nodeName)
    // console.log('previousElementSibling element: ', element.previousElementSibling.nodeName)

    elementsGroup.querySelectorAll('details summary').forEach(activeFocus);

    function activeFocus(item, index, array) {
      // console.log(item, index)
      if ( item == element ) {
        // console.log("a[" + index + "] = " + item);

        if( e.keyCode == keycode.right || e.keyCode == keycode.bottom ) {
          const toActiveNext = array[index+1];

          if (toActiveNext != undefined) {
            toActiveNext.focus();
          }
        }
        else if( e.keyCode == keycode.left || e.keyCode == keycode.top ) {
          const toActivePreview = array[index-1];

          if (toActivePreview != undefined) {
            toActivePreview.focus();
          }
        }
      }
    }
  }
}

