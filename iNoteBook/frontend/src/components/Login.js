import React, { useState,useContext } from "react";
import {useNavigate} from 'react-router-dom'
import { AlertContext } from "../context/alert/AlertContext";
const Login = () => {
	const ALERTContext = useContext(AlertContext)
	const { showAlert } = ALERTContext;

    let navigate = useNavigate();

	const [credentials, setcredentials] = useState({email:"",password:""});

	const host = "http://localhost:5000";

	const handleLoginSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch(`${host}/api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email:credentials.email, password:credentials.password }),
		});
		const json = await response.json();
		if (!json.authtoken)
        {
            showAlert("Invalid credentials","danger")
			setcredentials({email:"",password:""})
        }
        else
        {
			showAlert("You have been successfully Logged in","success")
            localStorage.setItem("token",json.authtoken)
            navigate("/")
        }
	};
	const onChange = (event) => {
        setcredentials({...credentials,[event.target.name]: event.target.value})
    };

	return (
		<div className="container my-4">
			<form onSubmit={handleLoginSubmit} method="post">
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
					<div id="emailHelp" className="form-text">
						We'll never share your email with anyone else.
					</div>
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
				<div className="flex jc-center">
					<button type="submit" className="btn btn-primary">
						Log In
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
