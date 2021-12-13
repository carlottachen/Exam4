const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json()); // When we want to be able to accept JSON.


const {
	compliments,
	fortunes,
	aList,
	getToDoList, 
	token,
	getMovies
} = require('./controller.js');

app.get('/api/compliment', compliments);
app.get('/api/fortune', fortunes);
app.post('/api/toDo/', aList);
app.get('/api/toDo/', getToDoList);
app.post('/api/token/', token);
app.get('/api/movies', getMovies)

app.listen(4000, () => console.log("Server running on 4000"));
