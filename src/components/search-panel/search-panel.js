import React, {Component} from "react";
import './search-panel.css';



export default  class SearchPanel extends Component {
    state = {
        term: ""
    }

    onSearchText = (e) => {
        let term = e.target.value;
        this.setState({term});
        this.props.onSearch(e.target.value);
    }

    render() {
        return (<input type="text"
        className="form-control search-input" placeholder="search" onChange={this.onSearchText}
        value={this.state.term}        />)
    }
}