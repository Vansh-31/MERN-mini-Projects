import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../context/alert/AlertContext";
const Signup = () => {
	const ALERTContext = useContext(AlertContext)
	const { showAlert } = ALERTContext;

	let navigate = useNavigate();
	const host = "http://localhost:5000";
	const [credentials, setcredentials] = useState({
		name: "",
		email: "",
		password: "",
		Cpassword: "",
	});
	const onChange = (event) => {
		setcredentials({ ...credentials, [event.target.name]: event.target.value });
	};
	const handleSignUpSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch(`${host}/api/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: credentials.name,
				email: credentials.email,
				password: credentials.password,
			}),
		});
		const json = await response.json();
		if (!json.authtoken) {
			showAlert(json.error,"danger")
			console.log(json);
		} else {
			showAlert("You have been succesfully Signed Up","success")
			localStorage.setItem("token", json.authtoken);
			navigate("/");
		}
	};
	return (
		<div className="container my-4">
		<h2 className="my-3">Create an Account to use iNoteBook</h2>
			<form method="post" onSubmit={handleSignUpSubmit}>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input
						type="name"
						className="form-control"
						id="name"
						name="name"
						aria-describedby="emailHelp"
						value={credentials.name}
						onChange={onChange}
						required
						minLength={3}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email address
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						name="email"
						aria-describedby="emailHelp"
						value={credentials.email}
						onChange={onChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						name="password"
						value={credentials.password}
						onChange={onChange}
						required
						minLength={8}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Confirm Password
					</label>
					<input
						type="password"
						className="form-control"
						id="Cpassword"
						name="Cpassword"
						value={credentials.Cpassword}
						onChange={onChange}
						required
						minLength={8}
					/>
				</div>
				<div className="flex jc-center">
					<button type="submit" className="btn btn-primary">
						Sign Up
					</button>
				</div>
			</form>
		</div>
	);
};

export default Signup;
