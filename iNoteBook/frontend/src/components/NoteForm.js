import React from "react";
const NoteForm = (props) => {
	return (
		<>
			<i
				className="fa-solid fa-xmark p-abs x-mark fa-lg"
				onClick={props.handleClickX_mark}
			></i>
			<div className="mb-3 my-2">
				<label htmlFor="title" className="form-label bold">
					Title
				</label>
				<input
					type="text"
					className="form-control"
					id="title"
					name="title"
					placeholder="Enter Your Title"
					onChange={props.handleOnchange}
                    defaultValue={props.title}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="desc" className="form-label">
					Write Your Note
				</label>
				<textarea
					className="form-control"
					id="desc"
					name="description"
					rows="6"
					onChange={props.handleOnchange}
                    defaultValue={props.description}
				></textarea>
			</div>
			<select
				className="form-select select-tag"
				aria-label="Default select example"
				id="tag-select"
			>
				<option value="Personal">Personal</option>
				<option value="Study">Study</option>
				<option value="work">Work</option>
				<option value="Secret">Secret</option>
			</select>
			<button
				id="save-note-btn"
				type="buton"
				className="btn btn-primary mb-3"
				onClick={props.handleSaveClick}
			>
				Save
			</button>
		</>
	);
};

export default NoteForm;
