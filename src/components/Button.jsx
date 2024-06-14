import React, { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

function getStyleName(name) {
	let className = {
		"/": "opt",
		x: "opt",
		"-": "opt",
		"+": "opt",
		"=": "equals"
	};

	return className[name] || "";
}

const Button = ({ value }) => {
	const { calc, setCalc } = useContext(CalcContext);

	const resetClick = () => {
		setCalc({ sign: "", num: 0, res: 0 });
	};

	const dotClick = () => {
		setCalc({
			...calc,
			num: !calc.num.toString().includes(".") ? calc.num + value : calc.num
		});
	};

	const signClick = () => {
		setCalc({
			sign: value,
			num: 0,
			res: !calc.res && calc.num ? calc.num : calc.res
		});
	};

	const equalsClick = () => {
		if (!calc.res && !calc.num) return;

		const math = (a, b, sign) => {
			let result = {
				"/": (a, b) => a / b,
				x: (a, b) => a * b,
				"-": (a, b) => a - b,
				"+": (a, b) => a + b
			};

			return result[sign](a, b);
		};

		setCalc({
			sign: "",
			num: 0,
			res: math(calc.res, calc.num, calc.sign)
		});
	};

	const invertClick = () => {
		setCalc({
			sign: "",
			num: calc.num ? calc.num * -1 : 0,
			res: calc.res ? calc.res * -1 : 0
		});
	};

	const percentClick = () => {
		setCalc({ num: calc.num / 100, res: calc.res / 100, sign: "" });
	};

	const numClick = () => {
		if (calc.num && calc.num.toString().length >= 7) return;

		let numString = value.toString();
		let numValue;

		if (numString === "0" && calc.num === 0) numValue = "0";
		else numValue = Number(calc.num + numString);

		setCalc({ ...calc, num: numValue });
	};

	const handleBtnClick = () => {
		const results = {
			C: resetClick,
			"+-": invertClick,
			"%": percentClick,
			".": dotClick,
			"/": signClick,
			x: signClick,
			"-": signClick,
			"+": signClick,
			"=": equalsClick
		};

		if (results[value]) {
			return results[value]();
		} else return numClick();
	};

	return (
		<button
			className={`button ${getStyleName(value)} ${calc.sign === value ? "opt-active" : ""}`.trim()}
			onClick={handleBtnClick}
		>
			{value}
		</button>
	);
};

export default Button;
