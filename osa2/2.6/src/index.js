import React from 'react';
import ReactDOM from 'react-dom';
import ContactList from './ContactList'
import Filter from './Filter'
import axios from 'axios'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
			newName: '',
			newNumber: '',
			filter: ''
		}
		
		
		this.handleNoteChange = (event) => {
			event.preventDefault()
			console.log(event.target.name)
			this.setState({ [event.target.name]: event.target.value })
		}

		this.setFilter = (event) => {
			this.setState({filter: event.target.value})
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
	componentDidMount() {
		axios
			.get('http://localhost:3001/persons').then(response => {
					this.setState({persons: response.data})
			})	
	}
  render() {

		const filteredContacts = this.state.persons.filter(contact => {
			return contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
		})
    return (
      <div>
        <h2>Puhelinluettelo</h2>
				
				
				<Filter filter={this.state.filter} handler={this.setFilter} />
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
				<ContactList persons={filteredContacts} />
        
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)