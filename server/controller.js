const toDos = require('./db.json');
const bcrypt = require('bcryptjs');

const users = [];

const fortunesArr = [
    "A beautiful, smart, and loving person will be coming into your life.",
    "A golden egg of opportunity falls into your lap this month.",
    "A lifetime of happiness lies ahead of you.",
    "A pleasant surprise is waiting for you.",
    "All will go well with your new project.",
	"All your hard work will soon pay off.",
];
globalId = 3;

const topThree = [
	" Spider-Man Far From Home\n",
	" Avengers Endgame\n",
	" Shang-Chi and the Legend of the Ten Rings\n",
	" Captain Marvel\n",
	" Black Panther\n",
	" Doctor Strange\n",
	" Guardians of the Galaxy\n",
	" Thor: The Dark World\n",
	" The Incredible Hulk\n",
	" Thor\n",
	" Iron Man 2\n"
]

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

	aList: (request, response) => {
		const {formInput} = request.body;
		let createForm = {
			formInput,
			id: globalId,
		}
		console.log(createForm);
		toDos.push(createForm);
		response.status(200).send(toDos);
		globalId++;
	},

	getToDoList: (request, response) => {
		response.status(200).send(toDos);
	},

	token: (request, response) => {
		console.log('Creating Token')
		console.log(request.body)

		const { password } = request.body;
		
		let salt = bcrypt.genSaltSync(3);
		let passwordHash = bcrypt.hashSync(password, salt);

		let newToken = {passwordHash};

		users.push(newToken);

		response.status(200).send(newToken);
		
	},

	getMovies: (request, response) => {
		let threeItems = [];
		for(let i = 0; i < 3; i++){
			let randomMovies = topThree[Math.floor(Math.random() * topThree.length)];
			threeItems.push(randomMovies);
		}
		response.status(200).send(threeItems);
	}
}
