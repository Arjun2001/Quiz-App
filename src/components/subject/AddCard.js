import React from 'react'
import './Addcard.css'
import AddBoxIcon from '@material-ui/icons/AddBox';

function AddCard(props) {
    return (
        <div className="add-card" onClick={props.open}>
            <AddBoxIcon />
        </div>
    )
}

export default AddCard
