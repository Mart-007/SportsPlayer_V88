const userModel = require("../models/user");
const sportModel = require("../models/sport");
const { validateEmail, formError, messageHandler } = require("../my_module/utilities")();
const { registrationValidation, loginValidation } = require("../my_module/validation")();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const redis = require("redis");
const user = require("../models/user");
const { json } = require("body-parser");
const client = redis.createClient(6379); //port number is optional

client.on("connect", function () {
	console.log("Connected to Redis...");
});

client.on("error", function (error) {
	console.error(error);
});

class Users {
	constructor() {} 

	async index(req, res) {
		try {
			let players = await userModel.getAllPlayers();
			let sports = await sportModel.getAllSports();

			res.render("index", { players, sports });
			req.session.destroy();
		} catch (error) {
			console.log(error);
		}
	}

	async filter_name_ajax(req, res) {
		// console.log(req.body);

		try {
			let players = await userModel.filter_name(req.body.name);
			res.json({ data: players });
		} catch (error) {
			console.log(error);
		}
	}

	async filter_gender_ajax(req, res) {
		console.log(req.body.gender);

		try {
			let gender = req.body.gender != undefined ? req.body.gender : ["male", "female"];
			let players = await userModel.filter_gender(gender);
			res.json({ data: players });

			// console.log(req.body);
		} catch (error) {
			console.log(error);
		}
	}

	async filter_sports_ajax(req, res) {
		console.log(req.body.gender);

		try {
			let sports = req.body.sports != undefined ? req.body.sports : [1, 2, 3, 4, 5, 6];
			let players = await userModel.filter_sport(sports);
			res.json({ data: players });

			// console.log(req.body);
		} catch (error) {
			console.log(error);
		}
	}

	async filter_gender_and_sports_ajax(req, res) {
		console.log(req.body);
		try {
			let gender = req.body.gender != undefined ? req.body.gender : ["male", "female"];
			let sports = req.body.sports != undefined ? req.body.sports : [1, 2, 3, 4, 5, 6];

			let players = await userModel.filter_gender_and_sport(gender, sports);
			res.json({ data: players });
		} catch (error) {}
	}

	async filter_name_gender_and_sports_ajax(req, res) {
		console.log(req.body);
		try {
			let gender = req.body.gender != undefined ? req.body.gender : ["male", "female"];
			let sports = req.body.sports != undefined ? req.body.sports : [1, 2, 3, 4, 5, 6];

			let players = await userModel.filter_name_gender_and_sport(req.body.name, gender, sports);
			res.json({ data: players });
		} catch (error) {}
	}
}

module.exports = new Users();
