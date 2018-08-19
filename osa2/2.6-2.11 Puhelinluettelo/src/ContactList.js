import React from 'react'

const Contact = (props) => (
	<p>{props.name} {props.number}</p>
)
const ContactList = (props) => {
    return props.persons.map(person => {
        return <Contact name={person.name} number={person.number} key={person.name}/>
    })
}

export default ContactList