import React, { useState, useContext } from "react";
import NoteForm from "./NoteForm";
import NoteContext from "../context/notes/NoteContext";

const Addnote = () => {
	const [Note, setNote] = useState({ "title": "", "description": "" });
	const [AddNotebtn, setAddNotebtn] = useState(false);
	const NotesContext = useContext(NoteContext);
	const { addNote } = NotesContext;

	const handleOnchange = (event) => {
		setNote({...Note,[event.target.name]:event.target.value})
	};

	const handleClickAddNote = (event) => {
		document.getElementById("add-note-card").style.width = "90%";
		setAddNotebtn(true);
	};
	const handleClickX_mark = (event) => {
		document.getElementById("add-note-card").style.width = "30%";
		setAddNotebtn(false);
	};
	const handleSaveClick = (event) => {
		let select = document.getElementById("tag-select")
		Note["tag"] = select.value
		addNote(Note)
		handleClickX_mark(event)
	};
	return (
		<div className="container">
			{AddNotebtn ? (
				<NoteForm handleOnchange={handleOnchange} handleClickX_mark={handleClickX_mark} handleSaveClick={handleSaveClick}></NoteForm>
			) : (
				<>
					{/* <div className="card-body">
						<button
							id="add-note-btn"
							name="add-note-btn"
							onClick={handleClickAddNote}
							type="button"
							className="add-note-btn"
						>
							&#8853;
						</button>
					</div> */}
					<i
						className="fa-solid fa-file-circle-plus fa-5x add-icon p-abs"
						onClick={handleClickAddNote}
					></i>
				</>
			)}
		</div>
	);
};

export default Addnote;
