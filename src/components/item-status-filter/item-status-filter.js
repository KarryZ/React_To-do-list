import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  
  onSelectType = (e) => {
    this.props.SelectTypeItems(e.target.dataset.typeitem);
  }

  render(){
    return (
      <div className="btn-group">
        <button type="button"
                className="btn btn-info" data-typeitem="All" onClick={this.onSelectType}>All</button>
        <button type="button"
                className="btn btn-outline-secondary" data-typeitem="Active" onClick={this.onSelectType} >Active</button>
        <button type="button"
                className="btn btn-outline-secondary" data-typeitem="Done" onClick={this.onSelectType} >Done</button>
      </div>
    );
  };
}