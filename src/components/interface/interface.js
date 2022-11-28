
const styleToggle = (doomBtnActiveToogle,doomStyleToogle,style) => {
  doomBtnActiveToogle.addEventListener('click', (e) => {
    doomStyleToogle.classList.toggle(style);
  });
};


const validationResponse = (validationResponse,inputValidation,message) => {
  validationResponse.innerHTML = message;
  validationResponse.classList.add("show");
  inputValidation.classList.add("error");
}

const validateSearch = (formSearch,btnSubmitSearch) => {

  const inputSearch = formSearch.querySelector("input[name=search]");
  const doomValidationResponse = formSearch.querySelector(".validation_response");

  formSearch.addEventListener('submit', function (e) {
    e.preventDefault();

    // const inputSearch = this.querySelector("input[name=search]").value;
    // const doomValidationResponse = this.querySelector(".validation_response");

    (inputSearch.value.trim() == "")
    ?
      validationResponse(doomValidationResponse,inputSearch,"Por favor escríbalo")
    :
      alert("enviar búsqueda")
  }, false);

  inputSearch.addEventListener('input', event => {
  // inputSearch.addEventListener("change", (e) => {
    console.log(inputSearch)
    inputSearch.classList.remove('error');
    doomValidationResponse.classList.remove("show");

    console.log(`The value entered is ${inputSearch.value}`)
  })
}

const addBack = (doomrandomBack,random) => {
  let urlImage =  `url('./img/interface/murales/mural0${random}.jpeg')`;
  doomrandomBack.style.backgroundImage = urlImage;
}

const randomBack = (doomrandomBack) => {
  const min = 1;
  const max = 4;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;

  (innerWidth <= 768) ? addBack(doomrandomBack,`${random}s`) : addBack(doomrandomBack,random);

  window.addEventListener('resize', function(event){
    (innerWidth <= 768) ? addBack(doomrandomBack,`${random}s`) : addBack(doomrandomBack,random);
  });
}

export { styleToggle,validateSearch,randomBack };
