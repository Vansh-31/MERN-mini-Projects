import "../css/Home.css";
import "../css/Utils.css";
import React, { useContext, useEffect } from "react";
import Addnote from "./Addnote";
import NoteItem from "./NoteItem";
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
	let navigate = useNavigate();
	const NotesContext = useContext(NoteContext);
	const { Notes, getAllNotes } = NotesContext;
	useEffect(() => {
		if (localStorage.getItem("token")) {
			getAllNotes();
		}
		else{
			navigate("/login")
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className="my-4 container flex sp-even f-wrap">
			<div id="add-note-card" className="card add-note-card my-2 note">
				<Addnote></Addnote>
			</div>
			{Notes.map((note) => {
				return <NoteItem key={note._id} note={note}></NoteItem>;
			})}
		</div>
	);
};

export default Home;
