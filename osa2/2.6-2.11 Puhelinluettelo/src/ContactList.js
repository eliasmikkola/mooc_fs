import React from 'react'

const Contact = (props) => (
    <div>
        <p>{props.contact.name} {props.contact.number}
            <button onClick={() => props.deleteHandler(props.contact)}>poista</button>
        </p>
    </div>
	
)
const ContactList = (props) => {
    return props.persons.map(person => {
        return <Contact contact={person} key={person.id} deleteHandler={props.deleteHandler}/>
    })
}

export default ContactList