import React from 'react'

const Country = (props) => (
	<p onClick={() => props.handler(props.country.alpha3Code)}> {props.country.name}</p>
)
const CountryDetails = (props) => (
    <div>
        {
            props.hasSelected ? ( <button onClick={() => props.handler(null)}>back to list</button>) : ''
        }
        <h1>{props.country.name}</h1>
        <p>Capital {props.country.capital}</p>
        <p>Population {props.country.population}</p>
        <img src={props.country.flag} style={{width: '100px', height:'auto'}}/>
        
        
    </div>
	
)
const CountryList = (props) => {
    if(props.countries.length === 1){
        const country = props.countries[0]
        return (<CountryDetails country={country} handler={props.handler} hasSelected={props.hasSelected}/>)
    }
    else if(props.countries.length > 10){
        return (<p>Too many matches, spesify another filter</p>)
    }
    else return props.countries.map(country => {
        return <Country country={country} handler={props.handler}  key={country.name} />
    })
}

export default CountryList