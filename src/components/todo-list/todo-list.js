import React from "react";
import ToDoListItem from "../todo-list-item/todo-list-item";
import "./todo-list.css"

const TodoList = ({ todos, onDeleted, onToggleDone, onToggleImportant }) => {
    const elements = todos.map(item => {
        const { id, show, ...itemProps } = item;

        let ClassNames = "list-group-item";

        if(!show) {
            ClassNames += " display-none"
        }

        return (
            <li key={id} className={ClassNames}>
                <ToDoListItem {...itemProps} 
                onDeleted={() => onDeleted(id)}
                onToggleDone={() => onToggleDone(id)}
                onToggleImportant={() => onToggleImportant(id)} />
            </li>);
    });

    return (
            <ul className="list-group todo-list">
                {elements}
            </ul>
     

    );
};

export default TodoList;