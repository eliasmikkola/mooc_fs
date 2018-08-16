import React from 'react'
import ReactDOM from 'react-dom'



const Button = (props) => ( <button onClick={props.handler}>{props.title}</button>)
    
const Header = (props) => (
    <h1>{props.title}</h1>
)
const Statistic = (props) => (
    <p>{props.title}   {props.count}</p>
)

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        good: 0,
        neutral: 0,
        bad: 0
      }
    }
    
    voteGood = (value) => {
        this.setState({
            good: this.state.good + 1
        })
    }
    voteNeutral = (value) => {
        this.setState({
            neutral: this.state.neutral + 1
        })
    }
    voteBad = (value) => {
        this.setState({
            bad: this.state.bad + 1
        })
    }
  
    render() {

      return (
        <div>
          <div>
            <Header title="Anna palautetta"/>
            <Button handler={() => this.voteGood()} title={"hyvä"} />
            <Button handler={() => this.voteNeutral()} title={"neutraali"} />
            <Button handler={() => this.voteBad()} title={"huono"} />
            <Header title="Statistiikka"/>
            <Statistic title="hyvä" count={this.state.good}/>
            <Statistic title="neutraali" count={this.state.neutral}/>
            <Statistic title="huono" count={this.state.bad}/>
          </div>
        </div>
      )
    }
  }
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )