const Hello = (props) => {
	console.log(props);
	return (
		<div>
			<p>
				Hello {props.name}, you are {props.age} years old
			</p>
		</div>
	);
};

const Footer = () => {
  return (
    <div>
      Greeting app created by <a href="https://github.com/Rooneyk1907">Kevin Rooney</a>
    </div>
  )
}

const App = () => {
	const name = 'Peter';
	const age = 10;
	return (
		<>
			<h1>Greetings</h1>
			<Hello
				name='Maya'
				age={26 + 10}
			/>
			<Hello
				name={name}
				age={age}
      />
      <Footer />
		</>
	);
};

export default App;
