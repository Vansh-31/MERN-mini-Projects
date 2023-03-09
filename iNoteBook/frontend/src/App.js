import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import NotFound from "./components/NotFound";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
import AlertState from "./context/alert/AlertContext";

function App() {
	return (
		<>
			<AlertState>
				<NoteState>
				<Router>
					<NavBar></NavBar>
					<Alert></Alert>
					<div className="container">
						<Routes>
							<Route
								exact
								path="/"
								element={<Home showAlert={""}></Home>}
							></Route>
							<Route exact path="/about" element={<About></About>}></Route>
							<Route exact path="/login" element={<Login></Login>}></Route>
							<Route exact path="/signup" element={<Signup></Signup>}></Route>
							<Route path="*" element={<NotFound></NotFound>}></Route>
						</Routes>
					</div>
				</Router>
				</NoteState>
			</AlertState>
		</>
	);
}

export default App;
