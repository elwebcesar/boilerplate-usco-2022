function include(file,handler) {
  var script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.defer = true;
  script.onload = handler;
  
  document.getElementsByTagName('head').item(0).appendChild(script);
}

export { include }
