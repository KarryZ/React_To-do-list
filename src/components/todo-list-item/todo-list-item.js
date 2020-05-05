import React, { Component } from "react";
import './todo-list-item.css';

export default class ToDoListItem extends Component {
  constructor() {
    super();
    this.state = {
      done: false,
      important: false
    }
  }

  onLabelClick = () => {
    this.setState(({ done }) => {
      return {
        done: !done
      };
    })
    console.log(`Done ${this.props.label}`);
  }

  onMarkLabelImportant = () => {
    this.setState(({ important }) => {
      return {
        important: !important
      };
    })
  }

  render() {
    const { label, onDeleted } = this.props;
    const { done, important } = this.state;

    let ClassNames = "todo-list-item";
    if (done) {
      ClassNames += " done"
    }
    if (important) {
      ClassNames += " important"
    }

    return (
      <span className={ClassNames}>
        <span
          className="todo-list-item-label"
          onClick={this.onLabelClick}>
          {label}
        </span>

        <button type="button"
          className="btn btn-outline-success btn-sm float-right" onClick={this.onMarkLabelImportant}>
          <i className="fa fa-exclamation" />
        </button>

        <button type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted} >
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
};


