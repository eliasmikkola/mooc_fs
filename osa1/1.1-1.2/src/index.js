import React from 'react'
import ReactDOM from 'react-dom'

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

const App = () => {
	
	const kurssi = 'Half Stack -sovelluskehitys'

	const osat =  [{
			nimi: 'Reactin perusteet',
			tehtavia: 10
		},
		{
			nimi: 'Tiedonvälitys propseilla',
			tehtavia: 7
		},
		{
			nimi: 'Komponenttien tila',
			tehtavia: 14
		}
	]

  return (
		<div>
			<Otsikko kurssi={kurssi} />
			<Sisalto osat={osat}/>
			<Yhteensa osat={osat} />
		</div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)