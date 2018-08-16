import React from 'react'
import ReactDOM from 'react-dom'



const Button = (props) => ( <button onClick={props.handler}>{props.title}</button>)
    
const Header = (props) => (
    <h1>{props.title}</h1>
)
const Statistic = (props) => (
    <p>{props.title}   {props.stat}</p>
)

const Statistics = (props) => {
    if(props.total > 0){
        return props.stats.map(n => {
            return (
                <Statistic title={n.title} stat={n.stat} key={n.title}/>
            )
        })
    } else {
        return <p>ei yhtään palautatte annettu</p>
    }   
}

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        good: 0,
        neutral: 0,
        bad: 0,
        total: 0
      }
    }
    
    voteGood = (value) => {
        this.setState({
            good: this.state.good + 1,
            total: this.state.total + 1
        })
    }
    voteNeutral = (value) => {
        this.setState({
            neutral: this.state.neutral + 1,
            total: this.state.total + 1
        })
    }
    voteBad = (value) => {
        this.setState({
            bad: this.state.bad + 1,
            total: this.state.total + 1
        })
    }
  
    render() {
        const median = Math.round( (this.state.total > 0 ? (this.state.good + (this.state.bad * -1) ) / this.state.total : 0) * 10 ) / 10
        const positive = Math.round(100 * (this.state.total > 0 ? this.state.good  / this.state.total : 0) * 10 ) / 10 +"%"
        const stats = [
            {
                title: "hyvä",
                stat:this.state.good
            },
            {
                title: "neutraali",
                stat:this.state.neutral
            },
            {
                title: "huono",
                stat:this.state.bad
            },
            {
                title: "keskiarvo",
                stat:median
            },
            {
                title: "positiivista",
                stat:positive
            }
        ]
        return (
            <div>
                <div>
                    <Header title="Anna palautetta"/>
                    <Button handler={() => this.voteGood()} title={"hyvä"} />
                    <Button handler={() => this.voteNeutral()} title={"neutraali"} />
                    <Button handler={() => this.voteBad()} title={"huono"} />
                    <Header title="Statistiikka"/>
                    <Statistics stats={stats} total={this.state.total}/>
                </div>
            </div>
        )
    }
  }
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )