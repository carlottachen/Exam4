const fortunesArr = [
    "A beautiful, smart, and loving person will be coming into your life.",
    "A golden egg of opportunity falls into your lap this month.",
    "A lifetime of happiness lies ahead of you.",
    "A pleasant surprise is waiting for you.",
    "All will go well with your new project.",
    "All your hard work will soon pay off.",
];
const toDos = require('./db.json');
globalId = 3;

module.exports = {
    compliments: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!",
                           "Cool shirt!",
                           "Your Javascript skills are stellar.",
        ];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
      },

      fortunes: (request, response) => {
          let randomFortune = fortunesArr[Math.floor(Math.random() * fortunesArr.length)];
          response.status(200).send(randomFortune);
      },

      aList: (request, response) =>{
          const {formInput} = request.body;
          let createForm = {
              formInput,
              id: globalId,
          }
          toDos.push(createForm);
          response.status(200).send(toDos);
          globalId++;
      },

      deleteSomething: (request, response) => {
          const {formInput} = request.body;
          
          for(let i = 0; i < toDos.length; i++){
              if(formInput === toDos[i]){
                  toDos.splice(i, 1);
                  response.status(200).send(toDos);
              }
          }
          response.status(400).send('Not found');
      },
}
