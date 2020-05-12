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
            this.createData("Drink Coffee"),
            this.createData("Create Awesome App"),
            this.createData("Have a luanch")
        ],
        term: "",
        filter: "all"
    };

    createData(label) {
        return  {
            label,
            important: false,
            done: false,
            show: true,
            id: this.maxid++
        };
    }
    
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
        const newItem = this.createData(text);

        this.setState( ( {todoData} ) => {
            const newArr = [...todoData, newItem];

            return {
                todoData: newArr
            }
        } )
    }

    toggleProperty(arr, id, property) {
        const idx = arr.findIndex( (el) => el.id === id );
        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [property]: !oldItem[property]
        }

        const newArr = [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx+1)
        ];
        
        return newArr;

    }

    onToggleDone = (id) => {
        this.setState(( {todoData} ) => {
            return {
                todoData: this.toggleProperty(todoData, id, "done")
            }
        })
    }

    onToggleImportant = (id) => {
        this.setState(( {todoData} ) => {
            return {
                todoData: this.toggleProperty(todoData, id, "important")
            }
        })
    }

    onSearch = (term ) => {
        this.setState( {term})
    }

    onFilterItems = (filter) => {
        this.setState( {filter} )
    }

    search = (arr, term) => {
        if(!term.length) return arr;

        return arr.filter( el => {
           return  el.label
                .toUpperCase()
                .includes(term.toUpperCase())
        })
    }

    filter = (items, filter) => {
        switch (filter)  {
            case "all": return items;
            case "active": return items.filter(item => !item.done);
            case "done": return items.filter(item => item.done);
            default: return items;
        }
    }

render() {
    const {todoData, term, filter} = this.state;
    const doneCount = todoData.filter( (el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    let visibleItems = this.filter(this.search(todoData, term), filter);

    return (
        <div className="todo-app">
            <AppHeader toDo={todoCount} done={doneCount} />
            <div className="top-panel d-flex">
                <SearchPanel onSearch={this.onSearch}/>
                <ItemStatusFilter onFilterItems={this.onFilterItems} filter={filter}/>
            </div>
            
            <TodoList 
            todos={visibleItems} 
            onDeleted={this.onDelete}
            onToggleDone={this.onToggleDone}
            onToggleImportant={this.onToggleImportant}
             />
            <NewButton onAddNewItem={this.onAddNewItem} />
        </div>);
}
   
}