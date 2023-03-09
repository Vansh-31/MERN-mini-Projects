import React, { useContext, useState } from "react";
import NoteForm from "./NoteForm";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
	const { note } = props;
	const NotesContext = useContext(NoteContext);
	const { editNote, deleteNote } = NotesContext;
	const [Note, setNote] = useState({
		title: note.title,
		description: note.description,
	});

	const handleOnchange = (event) => {
		setNote({ ...Note, [event.target.name]: event.target.value });
	};
	const handleClickX_mark = (event) => {
		setEdit(false);
	};
	const handleSaveClick = async (event) => {
		let select = document.getElementById("tag-select");
		Note["tag"] = select.value;
		Note["id"] = await note._id;
		console.log("Handle edit Click");
		console.log(note);
		editNote(Note);
		setEdit(false);
	};
	const handleEditClick = (event) => {
		setEdit(true);
	};
	const [Edit, setEdit] = useState(false);
	return (
		<>
			{!Edit ? (
				<div className="card my-2 note">
					<div className="card-body">
						<h5 className="card-title">{note.title}</h5>
						<p className="card-text">{note.description}</p>
						<i
							className="fa-solid fa-trash-can p-abs delete-icon fa-lg"
							onClick={() => {
								deleteNote(note._id);
							}}
						></i>
						<i
							className="fa-regular fa-pen-to-square p-abs edit-icon fa-lg"
							onClick={handleEditClick}
						></i>
						<button
							type="buton"
							className="btn btn-primary read-more-btn p-abs"
						>
							Read More
						</button>
					</div>
				</div>
			) : (
				<div
					id="add-note-card"
					className="card add-note-card my-2 note"
					style={{ width: "90%" }}
				>
					<div className="container">
						<NoteForm
							title={note.title}
							description={note.description}
							tag={note.tag}
							handleClickX_mark={handleClickX_mark}
							handleOnchange={handleOnchange}
							handleSaveClick={handleSaveClick}
						></NoteForm>
					</div>
				</div>
			)}
		</>
	);
};

export default NoteItem;
