import React from 'react'
const Filter = (props) => {
	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<div>
				Search: <input value={props.filter} onChange={props.handler} name="filter"/>
			</div>
		</form>
	)
}

export default Filter