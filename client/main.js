const complimentButton = document.getElementById("complimentButton");
const fortuneButton = document.getElementById("fortuneButton")
const displayFortune = document.getElementById("displayFortune")
const submitForm = document.querySelector("form");
const itemsList = document.getElementById('list-items');
const deleteAnItem = document.getElementById('EnterToDeleteItem');

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
submitForm.addEventListener('click', submitToDoList);

//////////functions below delete item from todo List///////////////
const deleteItemFromList = event => {
    event.preventDefault();
    
    let formInput = document.querySelector("#toDeleteField");

    let toDoObj = {formInput: formInput.value};

    removeItem(toDoObj);
    formInput.value = '';
}
const removeItem = (body) => {
    id = 1;
    axios.delete(`${baseURL}/toDo/${id}`, body)
    .then(function({data: toDo})
            {displayToDo(toDo)})
    .catch(function(error)
            {console.log(error.reponse.data)})
}
deleteAnItem.addEventListener('click', deleteItemFromList);
