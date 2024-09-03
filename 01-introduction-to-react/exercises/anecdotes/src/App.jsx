/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';

const AnecdoteDisplay = (props) => {
	return (
		<>
			<h1>Anecdote of the day</h1>
			<p>{props.anecdote}</p>
			<p>
				{props.votes === 1
					? `has ${props.votes} vote`
					: `has ${props.votes} votes`}
			</p>
		</>
	);
};

const TopVoteDisplay = (props) => {
	const anecdotes = [...props.anecdotes];
	const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
	const topAnecdote = sortedAnecdotes[0].anecdote;
	const topVotes = sortedAnecdotes[0].votes;

	return (
		<>
			<h1>Anecdote with most votes</h1>
			{topVotes > 0 ? (
				<>
					<p>{topAnecdote}</p>
					<p>has {topVotes} votes</p>
				</>
			) : (
				<>
					<p>No votes yet</p>
				</>
			)}
		</>
	);
};

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const App = () => {
	const initialAnecdotes = [
		{
			anecdote: 'If it hurts, do it more often.',
			votes: 0,
		},
		{
			anecdote: 'Adding manpower to a late software project makes it later!',
			votes: 0,
		},
		{
			anecdote:
				'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
			votes: 0,
		},

		{
			anecdote:
				'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
			votes: 0,
		},
		{
			anecdote: 'Premature optimization is the root of all evil.',
			votes: 0,
		},
		{
			anecdote:
				'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
			votes: 0,
		},
		{
			anecdote:
				'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
			votes: 0,
		},
		{
			anecdote: 'The only way to go fast, is to go well.',
			votes: 0,
		},
	];

	const [anecdotes, setAnecdotes] = useState(initialAnecdotes);
	const [selected, setSelected] = useState(0);

	const arrayLength = anecdotes.length;

	const nextHandler = () => {
		const newSelected = Math.floor(Math.random() * arrayLength);
		setSelected(newSelected);
	};

	const voteHandler = () => {
		const newAnecdotes = [...anecdotes];
		newAnecdotes[selected].votes += 1;
		setAnecdotes(newAnecdotes);
	};

	return (
		<div>
			<AnecdoteDisplay
				anecdote={anecdotes[selected].anecdote}
				votes={anecdotes[selected].votes}
			/>
			<Button
				onClick={voteHandler}
				text='vote'
			/>
			<Button
				onClick={nextHandler}
				text='next anecdote'
			/>
			<TopVoteDisplay anecdotes={anecdotes} />
		</div>
	);
};

export default App;
