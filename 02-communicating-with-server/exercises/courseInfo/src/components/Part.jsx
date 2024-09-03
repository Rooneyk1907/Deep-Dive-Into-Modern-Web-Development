/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Part = ({ name, exercises }) => {
	return (
		<>
			<p>
				{name} {exercises}
			</p>
		</>
	);
};

export default Part;
