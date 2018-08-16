import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => (
	<h1>{props.kurssi}</h1>
)

const kurssi = 'Half Stack -sovelluskehitys'

const osa1 = {
	nimi: 'Reactin perusteet',
 	tehtavia: 10
}
const osa2 = {
	nimi: 'Tiedonvälitys propseilla',
 	tehtavia: 7
}
const osa3 = {
	nimi: 'Komponenttien tila',
 	tehtavia: 14
}

const Osa = (props) => (
	<p>{props.osa} {props.tehtavia}</p>
)

const Sisalto = (props) =>  {
	return (
		<div>
			<Osa 
				osa = {osa1.nimi}
				tehtavia = {osa1.tehtavia}
			/>
			<Osa 
				osa = {osa2.nimi}
				tehtavia = {osa2.tehtavia}
			/>
			<Osa 
				osa = {osa3.nimi}
				tehtavia = {osa3.tehtavia}
			/>
		</div>
	)
}

const Yhteensa = (props) => {
	return (
		<p>yhteensä {props.osa1.tehtavia + props.osa2.tehtavia + props.osa3.tehtavia} tehtävää</p>
	)
}
const App = () => {
	
  return (
	<div>
	  <Otsikko kurssi={kurssi} />
	  <Sisalto />
	  <Yhteensa osa1={osa1}
				osa2={osa2}
				osa3={osa3} />
	</div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)