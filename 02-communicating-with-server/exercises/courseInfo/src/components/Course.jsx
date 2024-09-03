/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import Part from './Part';
import TotalExercises from './TotalExercises';

const Course = ({ name, parts }) => {
	return (
		<>
			{/* Header */}

			<h2>{name}</h2>
			{/* Content */}
			{parts.map((part) => (
				<Part
					key={part.id}
					name={part.name}
					exercises={part.exercises}
				/>
			))}
			<TotalExercises parts={parts} />
		</>
	);
};

export default Course;
