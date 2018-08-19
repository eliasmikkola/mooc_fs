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
			filter: '',
			selected: null
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
		}

		this.setSelection = (id) => {
			this.setState({selected: id})
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
		const filteredCountries = this.state.selected !== null ? 
		this.state.countries.filter(country => {
			return country.alpha3Code === this.state.selected
		})
		: this.state.countries.filter(country => {
			return country.name.toLowerCase().includes(this.state.filter.toLowerCase())
		})


    return (
      <div>
        <h2>Country search</h2>
				<Filter filter={this.state.filter} handler={this.setFilter} />
        <form onSubmit={this.searchChanged}>
          
        </form>
				<CountryList selection={this.state.selected} countries={filteredCountries} handler={this.setSelection} hasSelected={this.state.selected !== null}/>
        
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)