import React from 'react';
import ReactDOM from 'react-dom';

const Contact = (props) => (
	<p>{props.name} {props.number}</p>
)
const ContactList = (props) => {
		return props.persons.map(person => {
			return <Contact name={person.name} number={person.number} key={person.name}/>
		})
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
      { name: 'Martti Tienari', number: '040-123456' },
      { name: 'Arto Järvinen', number: '040-123456' },
      { name: 'Lea Kutvonen', number: '040-123456' }

      ],
			newName: '',
			newNumber: ''
		}
		this.handleNoteChange = (event) => {
			event.preventDefault()
			console.log(event.target.name)
			this.setState({ [event.target.name]: event.target.value })
		}
		this.submitHandler = (e) => {
			e.preventDefault()
			
			const alreadyExists = this.state.persons.find((person)=> {
				return person.name === this.state.newName
			})
			
			if(alreadyExists){
				alert(`Contact "${this.state.newName}" already exists.`)
			} else {
				var personsCopy = [...this.state.persons]
				personsCopy.push({
					name: this.state.newName,
					number: this.state.newNumber
				})
				this.setState({
					newName: '',
					newNumber: '',
					persons: personsCopy
				})
			}
			
		}

  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.submitHandler}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNoteChange} name="newName"/>
          </div>
					<div>
            numero: <input value={this.state.newNumber} onChange={this.handleNoteChange} name="newNumber"/>
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