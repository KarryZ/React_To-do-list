import React from "react";
import './new-button.css';

const NewButton = ({ addNew }) => {
    return (
        <div className="item-add-form">
            <button type="button" className="btn btn-outline-secondary" onClick={() => addNew("Have fun")}>
               Add Item
            </button>
        </div>

    );
};

export default NewButton;