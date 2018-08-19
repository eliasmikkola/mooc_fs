import React from 'react';
import ReactDOM from 'react-dom';
import CountryList from './CountryList'
import Filter from './Filter'
import axios from 'axios'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
			filter: ''
		}
		
		
		this.searchChanged = (event) => {
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
			.get('https://restcountries.eu/rest/v2/all').then(response => {
				console.log("did mount", response.data)
					this.setState({countries: response.data})
			})	
	}
  render() {
		const filteredCountries = this.state.countries.filter(country => {
			return country.name.toLowerCase().includes(this.state.filter.toLowerCase())
		})


    return (
      <div>
        <h2>Country search</h2>
				<Filter filter={this.state.filter} handler={this.setFilter} />
        <form onSubmit={this.searchChanged}>
          
        </form>
				<CountryList countries={filteredCountries} />
        
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)