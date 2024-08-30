const express = require('express');
const app = express.Router();

const Acad = require('../models/Acad');

app.get('/', (req, res) => {

	Acad.find()
		.then(acad => {
			res.send(acad);
		})
		.catch(err => res.status(404).json({ nomenuitemsfound: 'No academic details found' }));
});

module.exports = app;
