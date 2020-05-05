import React, { Component } from "react";


import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from '../item-status-filter';
import NewButton from "../new-button";

import './app.css';


export default class App extends Component {
    maxid = 100;

    state = {
        todoData: [
            {label:"Drink Coffee", important: false, id:1 },
            {label:"Create Awesome App", important: true, id:2 },
            {label:"Have a luanch", important: false, id:3},
        ]
    };
    
    onDelete = (id) => {
        this.setState(( {todoData} )=> {
            const idx = todoData.findIndex( (el) => el.id === id );
            const newArr = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx+1)
            ];

            return {
                todoData: newArr
            }
        })
    }

    onAddNewItem = (text) => {
        const newItem = {
            label: text,
            important: false,
            id: this.maxid++
        };

        this.setState( ( {todoData} ) => {
            const newArr = [...todoData, newItem];

            return {
                todoData: newArr
            }
        } )
    }

render() {
    return (
        <div className="todo-app">
            <AppHeader toDo={1} done={3} />
            <div className="top-panel d-flex">
                <SearchPanel/>
                <ItemStatusFilter />
            </div>
            
            <TodoList todos={this.state.todoData} onDeleted={this.onDelete} />
            <NewButton addNew={this.onAddNewItem} />
        </div>);
}
   
}