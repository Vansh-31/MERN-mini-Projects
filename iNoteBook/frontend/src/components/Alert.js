import React, { useContext } from "react";
import { AlertContext } from "../context/alert/AlertContext";
const Alert = (props) => {
	const ALERTContext = useContext(AlertContext);
	const { alert } = ALERTContext;
	if (alert) {
		return (
			<div
				className={`alert alert-${alert.type}`}
				role="alert"
				style={{ visibility: "visible" }}
			>
				{alert.message}
			</div>
		);
	} else {
		return (
			<div
				className={`alert alert-${alert.type}`}
				role="alert"
				style={{ visibility: "hidden" }}
			>
				This is an example message
			</div>
		);
	}
};

export default Alert;
