import { useState, useContext } from "react";
import NoteContext from "./NoteContext";
import { AlertContext } from "../alert/AlertContext";

const NoteState = (props) => {
	const ALERTContext = useContext(AlertContext);
	const { showAlert } = ALERTContext;

	const host = "http://localhost:5000";
	const notesInitial = [];

	// Get All Notes
	const getAllNotes = async () => {
		const response = await fetch(`${host}/api/notes/fetchAll`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
		});
		const json = await response.json();
		console.log("GETTING ALL NOTES");
		console.log(json);
		setNotes(json);
	};
	// Add a NOTE
	const addNote = async (note) => {
		const response = await fetch(`${host}/api/notes/addNote`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify(note),
		});
		const json = response.json();
		console.log("ADDING A NOTE");
		console.log(json);
		getAllNotes();
		showAlert("Your Note has been Added Successfully", "success");
	};

	// Edit a NOTE
	const editNote = async (note) => {
		const response = await fetch(`${host}/api/notes/updateNote/${note.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify(note),
		});
		console.log("EDIT NOTE RES: ", response.json());
		getAllNotes();
		showAlert("Your Note has been Edited Successfully", "success");
	};

	// Delete a NOTE
	const deleteNote = async (id) => {
		console.log(id);
		const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
		});
		const json = response.json();
		console.log(json);
		const newNotes = Notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(newNotes);
		showAlert("Your Note has been Deleted Successfully", "success");
	};

	const [Notes, setNotes] = useState(notesInitial);
	return (
		<NoteContext.Provider
			value={{ Notes, addNote, editNote, deleteNote, getAllNotes }}
		>
			{props.children}
		</NoteContext.Provider>
	);
};
export default NoteState;
