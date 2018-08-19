import React from 'react'

const Country = (props) => (
	<p>{props.name}</p>
)
const CountryDetails = (props) => (
    <div>
        <h1>{props.country.name}</h1>
        <p>Capital {props.country.capital}</p>
        <p>Population {props.country.population}</p>
        <img src={props.country.flag} style={{width: '100px', height:'auto'}}/>
    </div>
	
)
const CountryList = (props) => {
    if(props.countries.length === 1){
        const country = props.countries[0]
        return (<CountryDetails country={country}/>)
    }
    else if(props.countries.length > 10){
        return (<p>Too many matches, spesify another filter</p>)
    }
    else return props.countries.map(country => {
        return <Country name={country.name}  key={country.name}/>
    })
}

export default CountryList