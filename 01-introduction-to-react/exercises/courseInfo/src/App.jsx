const Header = (props) => {
	return <h1>{props.course}</h1>;
};

const Part = (props) => {
	return (
		<p>
			{props.part} {props.exercises}
		</p>
	);
};

const Content = (props) => {
	const parts = props.parts;
	return (
		<>
			<Part
				part={parts[0].name}
				exercises={parts[0].exercises}
			/>
			<Part
				part={parts[1].name}
				exercises={parts[1].exercises}
			/>
			<Part
				part={parts[2].name}
				exercises={parts[2].exercises}
			/>
		</>
	);
};

const Total = (props) => {
	const parts = props.parts;
	let total;
	total = parts[0].exercises + parts[1].exercises + parts[2].exercises;

	return (
		<>
			<p>Total number of exercises: {total}</p>
		</>
	);
};

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10,
			},
			{
				name: 'Using props to pass data',
				exercises: 7,
			},
			{
				name: 'State of a component',
				exercises: 14,
			},
		],
	};

	return (
		<>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	);
};

export default App;
