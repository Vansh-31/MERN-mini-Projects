const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

// ROUTE 1 : GET : Fetch All Notes : Login Required
router.get("/fetchAll", fetchUser, async (req, res) => {
	try {
		const notes = await Note.find({ user: req.user.id });
		res.json(notes);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
});

// ROUTE 2 : POST :  Add a new Note : Login Required
router.post(
	"/addNote",
	fetchUser,
	body("title", "Enter a valid title").isLength({ min: 3 }),
	body("description", "Description should be atleast 5 characters").isLength({
		min: 5,
	}),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const { title, description, tag } = req.body;
			const note = new Note({
				title,
				description,
				tag,
				user: req.user.id,
			});
			const savedNote = await note.save();
			res.json(savedNote);
		} catch (error) {
			console.error(error);
			res.status(500).send("Internal Server Error");
		}
	}
);

// ROUTE 3 : PUT :  Update a Note : Login Required
router.put(
	"/updateNote/:id",
	fetchUser,
	body("title", "Enter a valid title").isLength({ min: 3 }),
	body("description", "Description should be atleast 5 characters").isLength({
		min: 5,
	}),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const { title, description, tag } = req.body;
			// Create a new Note Object
			const newNote = {};
			if (title) {
				newNote.title = title;
			}
			if (description) {
				newNote.description = description;
			}
			if (tag) {
				newNote.tag = tag;
			}

			// Find the Note to be Updated
			let note = await Note.findById(req.params.id);
			if (!note) {
				return res.status(404).send("Not Found");
			}
			if (note.user.toString() !== req.user.id) {
				return res.status(401).send("Not Allowed");
			}
			note = await Note.findByIdAndUpdate(
				req.params.id,
				{ $set: newNote },
				{ new: true }
			);
			res.json(note);
		} catch (error) {
			console.error(error);
			res.status(500).send("Internal Server Error");
		}
	}
);

// ROUTE 4 : DELETE :  Deleta a Note : Login Required
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
	try {
		// Find the Note to be Deleted
		let note = await Note.findById(req.params.id);
		if (!note) {
			return res.status(404).send("Not Found");
		}
		if (note.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}
		note = await Note.findByIdAndDelete(req.params.id)
		res.json(note);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
});


module.exports = router;