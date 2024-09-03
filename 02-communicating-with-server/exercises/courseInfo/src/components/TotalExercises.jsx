/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const TotalExercises = ({ parts }) => {
	const exerciseArray = parts.map((part) => part.exercises);

	const totalExercises = exerciseArray.reduce((acc, curr) => acc + curr, 0);

	return (
		<p>
			<strong>total of {totalExercises} exercises</strong>
		</p>
	);
};

export default TotalExercises;
