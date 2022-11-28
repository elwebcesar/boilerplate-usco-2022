// const requestURL = "./json/funcionarios.json";
// const domLoad = document.querySelectorAll('.funcionario_carga');

export default function loadFuncionarios(requestURL,domLoad) {

  const printFuncionario = (json,dom,id,key) => {
    dom.innerHTML = json.funcionarios[id][key];
  }

  async function loadJSON(requestURL,dom,id,key) {
    const response = await fetch(requestURL);
    const json = await response.json();
    printFuncionario(json,dom,id,key);
  }
  
  // loadJSON(requestURL,0,'nombre');

  domLoad.forEach((item) => {
    loadJSON(requestURL,item,item.dataset.uaa,item.dataset.carga);
  });
}
