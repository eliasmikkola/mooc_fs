import React from 'react';
import ReactDOM from 'react-dom';

const Contact = (props) => (
	<p>{props.name}</p>
)
const ContactList = (props) => {
		return props.persons.map(person => {
			return <Contact name={person.name} key={person.name}/>
		})
		
	
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
		}
		this.handleNoteChange = (event) => {
			event.preventDefault()
			console.log(event.target.value)
			this.setState({ newName: event.target.value })
		}
		this.submitHandler = (e) => {
			e.preventDefault()
			var personsCopy = [...this.state.persons]
			personsCopy.push({
				name: this.state.newName
			})
			this.setState({
				newName: '',
				persons: personsCopy
			})
		}

  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.submitHandler}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNoteChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
				<ContactList persons={this.state.persons} />
        
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)