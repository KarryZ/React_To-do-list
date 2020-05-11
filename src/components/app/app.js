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
        term: ""
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

    SelectTypeItems = (filterType) => {
        this.setState(( {todoData} ) => {
            let newArr = [...todoData];
            
            if(filterType === "All"){
                newArr.forEach((el) => el.show = true)
            }

            if(filterType === "Active"){
                newArr.forEach((el) => {
                    if(!el.done){
                        el.show = true
                    }else{
                        el.show = false
                    }
                })
            }

            if(filterType === "Done") {
                newArr.forEach((el) => {
                    if(el.done){
                        el.show = true
                    }else{
                        el.show = false
                    }
                })
            }

            return {
                todoData: newArr
            }
        
        })
    }

    search = (arr, term) => {
        if(!term.length) return arr;

        return arr.filter( el => {
           return  el.label
                .toUpperCase()
                .includes(term.toUpperCase())
        })
    }

render() {
    const {todoData, term} = this.state;
    const doneCount = todoData.filter( (el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    let visibleItems = this.search(todoData, term);

    return (
        <div className="todo-app">
            <AppHeader toDo={todoCount} done={doneCount} />
            <div className="top-panel d-flex">
                <SearchPanel onSearch={this.onSearch}/>
                <ItemStatusFilter SelectTypeItems={this.SelectTypeItems} />
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