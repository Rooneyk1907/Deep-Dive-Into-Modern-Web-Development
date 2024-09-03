/* eslint-disable react/prop-types */

import { useState } from 'react';

const MainHeading = () => <h1>give feedback</h1>;

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const StatisticsHeading = () => <h1>statistics</h1>;
const StatisticsLine = (props) => {
	return (
		<tr>
			<td>{props.text}</td>
			<td>{props.value}</td>
		</tr>
	);
};
const StatisticsDispay = (props) => {
	const total = props.good + props.neutral + props.bad;
	const average = ((props.good - props.bad) / total).toFixed(2);
	const positive = ((100 * props.good) / total).toFixed(1);

	return (
		<>
			{total > 0 ? (
				<table>
					<tbody>
						<StatisticsLine
							text='good'
							value={props.good}
						/>
						<StatisticsLine
							text='neutral'
							value={props.neutral}
						/>
						<StatisticsLine
							text='bad'
							value={props.bad}
						/>
						<StatisticsLine
							text='all'
							value={total}
						/>
						<StatisticsLine
							text='average'
							value={average}
						/>
						<StatisticsLine
							text='positive'
							value={`${positive} %`}
						/>
					</tbody>
				</table>
			) : (
				<p>No feedback Given</p>
			)}
		</>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	//Event handlers
	const onGoodClick = () => {
		setGood(good + 1);
	};
	const onNeutralClick = () => {
		setNeutral(neutral + 1);
	};
	const onBadClick = () => {
		setBad(bad + 1);
	};

	return (
		<>
			<MainHeading />
			<Button
				onClick={onGoodClick}
				text='good'
			/>
			<Button
				onClick={onNeutralClick}
				text='neutral'
			/>
			<Button
				onClick={onBadClick}
				text='bad'
			/>
			<StatisticsHeading />

			<StatisticsDispay
				good={good}
				neutral={neutral}
				bad={bad}
			/>
		</>
	);
};

export default App;
