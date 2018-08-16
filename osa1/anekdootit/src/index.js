import React from 'react'
import ReactDOM from 'react-dom'

const getRandom = (number) => {
    //get random number in scope of anecdote length
    var random = Math.floor(Math.random() * (anecdotes.length )) 
    return random !== number ? random : getRandom(number)
}
const arrayToObj = (arr) => {
    //convert array into object with index number as a key
    var newObj = {}
    arr.forEach((n, index) => {
        newObj[index] = {
            text: n,
            votes: 0
        }
    })

    return newObj
}




class App extends React.Component {
    
    constructor(props) {

        super(props)
        this.state = {
            mappedAnecdotes: arrayToObj(anecdotes),
            selected: getRandom(-1),
            totalVotes: 0
        }
    }
    
    getAnecdote = () => {
        this.setState({ selected: getRandom(this.state.selected)})
    }

    vote = () => {
        //copy anecdotes from state and modify the copy, then set in store
        const anecdoteCopy = {...this.state.mappedAnecdotes}
        anecdoteCopy[this.state.selected]["votes"] += 1
        this.setState({
            mappedAnecdotes: anecdoteCopy,
            totalVotes: this.state.totalVotes +1
        })
    }
    getTopAnecdote = () => {
        //map anecdote objects to array
        const anecdotesAsArray = Object.keys(this.state.mappedAnecdotes).map(i => this.state.mappedAnecdotes[i])
        //sort and take the first one
        const sortedArray = anecdotesAsArray.sort((a, b) => {return b.votes - a.votes })
        return sortedArray[0]
    }


    render() {
        return (
            <div>
                <Anecdote anecdote={this.state.mappedAnecdotes[this.state.selected]} />
                <Button handler={this.vote} title="vote" />
                <Button handler={this.getAnecdote} title="next anecdote"/>
                <TopAnecdote anecdote={this.getTopAnecdote()} total={this.state.totalVotes} />
            </div>
        )
    }
}
const Button = (props) => (
    <div>
        <button onClick={props.handler}>{props.title}</button>
    </div>
)
const Anecdote = (props) => (
    <div>
        <p>{props.anecdote.text}</p>
        <p>has {props.anecdote.votes} votes</p>
    </div>
)

const TopAnecdote = (props) => {
    if(props.total > 0) {
        return (
            <Anecdote anecdote={props.anecdote}/>
        )
    } else {
        return <p>No votes yet</p>
    }
    
} 

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)