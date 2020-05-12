import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  
  

  buttons = [
    {name:"all", label: "All"},
    {name:"active", label: "Active"},
    {name:"done", label: "Done"},
  ]

  render(){
    const {filter, onFilterItems} = this.props;
    let buttons = this.buttons.map( ({name, label}) => {
      let isActive = filter === name;
      let classes =  isActive ? "btn-info" : "btn-outline-secondary";
      return (
        <button type="button"
           className={`btn ${classes}`}
           key={name}   
           onClick={() => onFilterItems(name)}>
             {label}
        </button>
      )
    })
    return (
      <div className="btn-group">
       {buttons}        
      </div>
    );
  };
}