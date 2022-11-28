function loadScriptPromise(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.defer = true;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Error de carga de script para ${src}`));

    document.head.append(script);
  });
}

export { loadScriptPromise }
