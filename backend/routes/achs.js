const express = require('express');
const app = express.Router();

const Ach = require('../models/Ach');

app.get('/', (req, res) => {

	Ach.find()
		.then(ach => {
			res.send(ach);
		})
		.catch(err => res.status(404).json({ nomenuitemsfound: 'No achievements found' }));
});

module.exports = app;
