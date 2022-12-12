// ------------------------------------------------------------------------
// Slipe
// https://splidejs.com/
// ------------------------------------------------------------------------

import { Splide } from "@splidejs/splide";
const classSplide = '.splide-slider .splide';

if ( document.querySelector(classSplide) ) {
  const splide = new Splide( classSplide, {
    // Accessibility
    role: 'group',
    // direction          : 'ttb',
    // paginationDirection: 'ltr',

    // Config
    type: 'loop',
    drag: 'free',
    // perPage : 3,
    padding: '8rem',
    autoplay: true, // autoplay: 'pause',
    interval: 5000,
    speed: '600',
    easing: 'ease',
    // autoScroll: {
    //   speed: 2,
    // },
    // focus: 'center',
    lazyLoad: 'nearby',

    breakpoints: {
      992: {
        // perPage: 2,
        // gap    : '.7rem',
        // height : '6rem',
        padding: '0',
      },
    },

    // Default Texts
    i18n: {
      prev: 'Anterior slide',
      next: 'Siguiente slide',
      // play: 'Ejecutar',
      // pause: 'Detener'
    }
  });

  splide.mount();
}

const classSplideDocs = '.splide-slider-docs .splide';

if ( document.querySelector(classSplideDocs) ) {
  const splide = new Splide( classSplideDocs, {
    // Accessibility
    role: 'group',

    // Config
    type: 'loop',
    drag: 'free',
    perPage : 4,
    // padding: '8rem',
    autoplay: true, // autoplay: 'pause',

    breakpoints: {
      1060: {
        perPage: 3,
      },
      992: {
        perPage: 2,
      },
      768: {
        perPage: 1,
      },
    },
  });

  splide.mount();
}


// ------------------------------------------------------------------------
// widget accessibility
// userway.org
// https://www.equalweb.com/
// ------------------------------------------------------------------------

// FREE
// (function(d){var s = d.createElement("script");s.setAttribute("data-account", "BTSUqtpdT8");s.setAttribute("src", "https://cdn.userway.org/widget.js");(d.body || d.head).appendChild(s);})(document)

// https://manage.userway.org/settings
(function(d){var s = d.createElement("script");s.setAttribute("data-account", "YSiEuE7ptU");s.setAttribute("src", "https://cdn.userway.org/widget.js");(d.body || d.head).appendChild(s);})(document)
{/* <button id="accessibilityWidget" tabindex="0">Click for Accessibility</button> */}


// ------------------------------------------------------------------------
// Calendar
// ------------------------------------------------------------------------

import { caleandar } from "../components/calendar/caleandar-json";
const calendarDom = "caleandar";
const testCalendar = !!document.getElementById(calendarDom);

if ( testCalendar === true ) {
  const calendar = document.getElementById(calendarDom);

  const events = require('../components/calendar/getDateEvents.json'); // json actual usco
  // console.log('events: ', events)

  const settings={};
  const lang = calendar.getAttribute('data-lang');

  let urlEvents = 'eventos';

  if (lang == "en") {
    urlEvents = 'events';
  }

  caleandar(calendar, events, settings, lang, urlEvents);
}


// ------------------------------------------------------------------------
// Preload Images
// ------------------------------------------------------------------------
import preloadImages from "../components/preloadImages/preloadImages";
const imagesToLoad = document.querySelectorAll('img.loader[data-src]');
preloadImages(imagesToLoad);


// ------------------------------------------------------------------------
// Animate Details
// ------------------------------------------------------------------------
import { detailsAnimate } from "../components/detailsAnimate/detailsAnimate";
detailsAnimate();

import { detailsKeyboard } from "../components/detailsAnimate/detailsKeyboard";
const classDetailsGroup = '.details-group';

if ( document.querySelector(classDetailsGroup) ) {
  detailsKeyboard( document.querySelector(classDetailsGroup) );
}


// ------------------------------------------------------------------------
// Window scrollTo This
// ------------------------------------------------------------------------
import { scrollToThis, scrollToTop } from "../components/scrollTo/scrollTo";

const doomScrollToThis = document.querySelectorAll('.scrollToThis');
doomScrollToThis ? scrollToThis(doomScrollToThis) : null;

const doomScrollToTop = document.getElementById("scrollToTop");
doomScrollToThis ? scrollToTop(doomScrollToTop) : null;


// ------------------------------------------------------------------------
// Resize Image and Map
// ------------------------------------------------------------------------
import ImageResizeMap from "../components/ImageResizeMap/ImageResizeMap";
const classImageResizeMap = '.imageResizeMap';

if ( document.querySelector(classImageResizeMap) ) {
  const resizeImg = new ImageResizeMap({
    // width: 1024,
    // height: 768,
    // element : '#power-puff__map'
    element : classImageResizeMap
  });
}


// ------------------------------------------------------------------------
// SVGInject
// ------------------------------------------------------------------------
import SVGInjectInstance from "@iconfu/svg-inject";
SVGInject(document.querySelectorAll("img.injectable"));



// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// ONLY FOR USCO
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------


// ------------------------------------------------------------------------
// Interface
// ------------------------------------------------------------------------
import { styleToggle,validateSearch,randomBack } from "../components/interface/interface";

const doomBtnActiveToogle = document.getElementById("btn_view_search");
const doomStyleToogle = document.querySelector(".form_search");

if ( doomBtnActiveToogle ) {
  styleToggle(doomBtnActiveToogle,doomStyleToogle,"display");
  validateSearch(doomStyleToogle,btnSubmitSearch);
}

const doomRandomBack = document.getElementById("block_links");
if ( doomRandomBack ) {
  randomBack(doomRandomBack);
}


// ------------------------------------------------------------------------
// Funcionarios JSON
// ------------------------------------------------------------------------
import loadFuncionarios from "../components/funcionarios/loadFuncionarios";
const classFuncionarios = '.funcionario_carga';

if ( document.querySelector(classFuncionarios) ) {
  const domLoad = document.querySelectorAll(classFuncionarios);
  const requestURL = "./json/funcionarios.json";
  loadFuncionarios(requestURL,domLoad);
}
