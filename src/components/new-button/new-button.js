import React, { Component } from "react";
import './new-button.css';


export default class NewButton extends Component {
    state = {
        label: ""
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        }) 
    };   

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAddNewItem(this.state.label);
        this.setState({
            label: ""
        })
    };

    render() {
        return (
            <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
                <input
                    type="text"
                    className="form-control"
                    onChange={this.onLabelChange}
                    placeholder="What needs to be done"
                    value={this.state.label} />
                <button type="submit"
                className="btn btn-outline-secondary submitBtn">
                    Add Item
                </button>
            </form>

        );
    }
};