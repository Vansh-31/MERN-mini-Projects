import { createContext, useState } from "react";

const AlertContext = createContext();

const AlertState = (props) => {
	const [alert, setalert] = useState(false);
	const showAlert = (msg, type, time = 2000) => {
		setalert({
			message: msg,
			time: time,
			type: type,
		});
		setTimeout(() => {
			setalert(false);
		}, time);
	};
	return (
		<AlertContext.Provider value={{ alert, showAlert }}>
			{props.children}
		</AlertContext.Provider>
	);
};
export {AlertContext}
export default AlertState;
