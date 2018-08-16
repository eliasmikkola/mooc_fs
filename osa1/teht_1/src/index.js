import React from 'react'
import ReactDOM from 'react-dom'
const Otsikko = (props) => (
	<h1>{props.kurssi}</h1>
)

const kurssi = 'Half Stack -sovelluskehitys'
const osa1 = 'Reactin perusteet'
const tehtavia1 = 10
const osa2 = 'Tiedonvälitys propseilla'
const tehtavia2 = 7
const osa3 = 'Komponenttien tila'
const tehtavia3 = 14

const Osa = (props) => (
	<p>{props.osa} {props.tehtavia}</p>
)

const Sisalto = (props) =>  {
	return (
		<div>
			<Osa 
				osa = {osa1}
				tehtavia = {tehtavia1}
			/>
			<Osa 
				osa = {osa2}
				tehtavia = {tehtavia2}
			/>
			<Osa 
				osa = {osa3}
				tehtavia = {tehtavia3}
			/>
		</div>
	)
}

const Yhteensa = (props) => {
	return (
		<p>yhteensä {props.tehtavia1 + props.tehtavia2 + props.tehtavia3} tehtävää</p>
	)
}
const App = () => {
	
  return (
	<div>
	  <Otsikko kurssi={kurssi} />
	  <Sisalto />
	  <Yhteensa tehtavia1={tehtavia1}
				tehtavia2={tehtavia2}
				tehtavia3={tehtavia3} />
	</div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)