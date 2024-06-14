import Screen from "./components/Screen";
import Keypad from "./components/Keypad";
import Button from "./components/Button";
import CalcProvider from "./context/CalcContext";

const btnValues = [
	["C", "+-", "%", "/"],
	[7, 8, 9, "x"],
	[4, 5, 6, "-"],
	[1, 2, 3, "+"],
	[0, ".", "="]
];

function App() {
	return (
		<CalcProvider>
			<div className="wrapper">
				<div className="content">
					<div className="content-header">
						<h1>calcX</h1>
						<p>
							neumorphismic
							<br />
							calculator
						</p>
					</div>

					<Screen />

					<Keypad>
						{btnValues.flat().map((btn, i) => {
							return <Button value={btn} key={i} />;
						})}
					</Keypad>
				</div>
			</div>
		</CalcProvider>
	);
}

export default App;
