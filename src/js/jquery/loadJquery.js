import { include } from '../functions/include';
import { loadScriptPromise } from '../functions/loadScriptPromise';


const src1 = "./jquery/jquery-3.6.0.min.js";
// const src2 = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
// const src3 = "https://code.jquery.com/jquery-3.6.0.min.js";

let promise = loadScriptPromise(src1);

function loadPlugins(){
  console.log('load the script');
}


promise.then(
  // script => alert(`${script.src} está cargado!`),
  script => (
    loadPlugins()
  ),
  error => console.log(`Error: ${error.message}`)
);
