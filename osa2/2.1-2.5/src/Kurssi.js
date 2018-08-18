import React from 'react'

const Otsikko = (props) => (
	<h1>{props.kurssi}</h1>
)


const Osa = (props) => (
	<p>{props.nimi} {props.tehtavia}</p>
)

const Sisalto = (props) =>  {
	var osaArray = []
	props.osat.forEach((osa) => {
		osaArray.push(
			<Osa nimi = {osa.nimi} tehtavia = {osa.tehtavia} key={osa.nimi}/>
		)
	})
	return (
		<div>{osaArray}</div>
	)
}

const Yhteensa = (props) => {
	return (
		<p>yhteensä {props.osat.map(n=>n.tehtavia).reduce((x,y)=>x+y)} tehtävää</p>
	)
}
const Kurssi = (props) => {
	return (
		<div>
			<Otsikko kurssi={props.kurssi.nimi} />
			<Sisalto osat={props.kurssi.osat}/>
			<Yhteensa osat={props.kurssi.osat} />
		</div>
	)
}
export default Kurssi