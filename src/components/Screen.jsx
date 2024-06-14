import React, { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

import "./Screen.css";

const Screen = () => {
	const { calc } = useContext(CalcContext);

	return (
		<div className="screen-wrapper">
			<div className="screen-outer">
				<div className="screen-inner">{calc.num ? calc.num : calc.res}</div>
			</div>
		</div>
	);
};

export default Screen;
