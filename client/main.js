const complimentButton = document.getElementById("complimentButton");
const fortuneButton = document.getElementById("fortuneButton")
const displayFortune = document.getElementById("displayFortune")
const submitForm = document.querySelector("#this-form");
const itemsList = document.getElementById('list-items');
const displayToDoList = document.getElementById('display-to-do');
const passwordContainer = document.getElementById('password-container');

const baseURL = "http://localhost:4000/api";

//////////first function to get a compliment/////////////////////////
function getCompliment(event) {
    axios.get(`${baseURL}/compliment/`)
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
};
complimentButton.addEventListener('click', getCompliment);

//////////second function to get a fortune///////////////////////////
const getFortune = event => {
      axios.get(`${baseURL}/fortune/`)
        .then(function(response) {
            const data = response.data;
            displayFortune.innerHTML = data;
        });
};
fortuneButton.addEventListener('click', getFortune);

//////////functions below create and display a todo list/////////////
const submitToDoList = event => {
    event.preventDefault();
    
    let formInput = document.querySelector("#toDoField");

    let toDoObj = {formInput: formInput.value};

    createToDoList(toDoObj);
    formInput.value = '';
}
const createToDoList = body => {
    axios.post(`${baseURL}/toDo/`, body)
        .then(console.log('success'))
        .catch(function(error)
                {console.log(error.reponse.data)})
}
submitForm.addEventListener('click', submitToDoList);

//display to do list
const getToDoList = () => {
	axios.get(`${baseURL}/toDo/`)
        .then(function({data: toDo})
                {displayToDo(toDo)})
        .catch(function(error)
                {console.log(error.reponse.data)})
}
const displayToDo = toDoArr => {
    itemsList.innerHTML = '';
    for(let i = 0; i < toDoArr.length; i++){
        addToDoList(toDoArr[i]);
    }
}
const addToDoList = toDoItem => {
    const newItem = document.createElement('div');
    newItem.classList.add('toDo-item');
    newItem.innerHTML = `<p>${toDoItem.formInput}</p>`;
    itemsList.appendChild(newItem);
}
displayToDoList.addEventListener('click', getToDoList);

////get token
const displayHere = document.querySelector('#display-token');
const tokenForm = document.querySelector('#token-form');

function submitStringToken(event) {
    event.preventDefault();
  
    let password = document.querySelector('#enter-password');
  
    let bodyObj = {password: password.value};

    token(bodyObj);
    password.value = '';
}

const token = body => {
    axios.post(`${baseURL}/token`, body).
    then(response => {createToken(response.data)})
    .catch(error => {console.log(error)});
}
  
  function createToken(data) {
      displayHere.innerHTML = '';
      const thisToke = document.createElement('div');
      thisToke.classList.add('user-token');
  
      thisToke.innerHTML = `<p>Token: ${data.passwordHash}</p>`
      displayHere.appendChild(thisToke);
  }
  
  tokenForm.addEventListener('submit', submitStringToken);
