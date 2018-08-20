import React from 'react';
import ReactDOM from 'react-dom';
import ContactList from './ContactList'
import Filter from './Filter'
import API from './api.js'
import './styles.css'
import Notification from './Notification'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			persons: [],
			newName: '',
			newNumber: '',
			filter: '',
			message: null,
			errorMessage: null
		}


		this.handleNoteChange = (event) => {
			event.preventDefault()
			console.log(event.target.name)
			this.setState({ [event.target.name]: event.target.value })
		}

		this.setFilter = (event) => {
			this.setState({ filter: event.target.value })
		}
		this.deleteContact = (contact) => {
			if (window.confirm(`Want to delete ${contact.name}?`)) {
				API.remove(contact.id).then((response) => {
					this.setState({
						persons: this.state.persons.filter(n => n.id !== contact.id),
						message: `${contact.name} poistettu`,
						errorMessage: null
					})
				})
			}
		}

		this.submitHandler = (e) => {
			e.preventDefault()
			const existingContact = this.state.persons.find((person) => {
				return person.name === this.state.newName
			})
			const newPerson = {
				name: this.state.newName,
				number: this.state.newNumber
			}
			if (existingContact) {
				if (window.confirm(`Want to update ${newPerson.name}?`)) {
					API.update(existingContact.id, newPerson).then((response) => {
						this.setState({
							persons: this.state.persons.map(n => n.id !== existingContact.id ? n : response.data),
							message: `${response.data.name} päivitetty`,
							errorMessage: null
						})
					}).catch(error => {
						this.setState({
							persons: this.state.persons.filter(n => n.id !== existingContact.id),
							errorMessage: `${existingContact.name} on ehditty poistaa jo `,
							message: null
						})
					})
				}
			} else {
				var personsCopy = [...this.state.persons]

				API.create(newPerson)
					.then((response) => {
						personsCopy.push(response.data)

						this.setState({
							newName: '',
							newNumber: '',
							persons: personsCopy,
							message: `${response.data.name} lisätty`,
							errorMessage: null
						})
					}).catch(error => {
						console.log(error.response.data.error)
							this.setState({
								errorMessage: error.response.data.error
							})
					})

			}
		}

	}
	componentDidMount() {

		API.getAll()
			.then(response => {
				console.log("ALL", response.data)
				this.setState({ persons: response.data })
			})
	}
	render() {
		const filteredContacts = this.state.persons.filter(contact => {
			return contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
		})

		return (
			<div>
				<h2>Puhelinluettelo</h2>
				<Notification message={this.state.message} status="success" />
				<Notification message={this.state.errorMessage} status="error" />


				<Filter filter={this.state.filter} handler={this.setFilter} />
				<form onSubmit={this.submitHandler}>
					<div>
						nimi: <input value={this.state.newName} onChange={this.handleNoteChange} name="newName" />
					</div>
					<div>
						numero: <input value={this.state.newNumber} onChange={this.handleNoteChange} name="newNumber" />
					</div>
					<div>
						<button type="submit">lisää</button>
					</div>
				</form>
				<ContactList deleteHandler={this.deleteContact} persons={filteredContacts} />

			</div>
		)
	}
}


ReactDOM.render(
	<App />,
	document.getElementById('root')
)