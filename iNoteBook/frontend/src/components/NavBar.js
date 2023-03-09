import React,{useContext} from "react";
import { AlertContext } from "../context/alert/AlertContext";

import { useLocation, Link, useNavigate } from "react-router-dom";
const NavBar = () => {
	const {showAlert} = useContext(AlertContext)
	let navigate = useNavigate()
	const handleLogOut = ()=>{
		localStorage.removeItem("token")
		navigate("/login")
		showAlert("You have been successfully Logged Out","success")
	}
	let location = useLocation();
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					iNoteBook
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link
								className={`nav-link ${
									location.pathname === "/" ? "active" : ""
								}`}
								aria-current="page"
								to="/"
							>
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className={`nav-link ${
									location.pathname === "/about" ? "active" : ""
								}`}
								to="/about"
							>
								About
							</Link>
						</li>
					</ul>
					{!localStorage.getItem("token") ? (
						<>
							<Link className="btn btn-primary mx-2" to="/login" role="button">
								Log In
							</Link>
							<Link className="btn btn-primary mx-2" to="/signup" role="button">
								Sign Up
							</Link>
						</>
					) : (
						<button className="btn btn-primary mx-2" onClick={handleLogOut}>
							Logout
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
