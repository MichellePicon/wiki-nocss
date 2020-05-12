import React, { Component } from 'react';
import { Link, Router } from 'react-router-dom';
import renderHTML from 'react-render-html';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: []
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
    this.setState({
      filtered: this.props.items
    });
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.items
    });
  }
    
    handleChange(e) {
        // Variable to hold the original version of the list
    let currentList = [];
        // Variable to hold the filtered list before putting into state
    let newList = [];
        
        // If the search bar isn't empty
    if (e.target.value !== "") {
            // Assign the original list to currentList
      currentList = this.props.items;
            
            // Use .filter() to determine which items should be displayed
            // based on the search terms
      newList = currentList.filter(item => {
                // change current item to lowercase
        const lc = item.title.toString().toLowerCase();
                // change search term to lowercase
        const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
            // If the search bar is empty, set newList to original task list
      newList = this.props.items;
    }
        // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList
    });
  }
    
    render() {
        return (
            <div>
              <br></br>
                <input type="text" className="input" onChange={this.handleChange} placeholder="Buscar..." />
                    <br></br>
                    <br></br>
                    <h3 class="panel-title">Artículos</h3>
                    <br></br>
                    <table class="table table-stripe">
                    <thead>
                        <tr>
                        <th>Título</th>
                        <th>Contenido</th>
                        <th>Categoría</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filtered.map(item => (
                          <tr>
                              <td><Link to={`/show/${item.key}`}>{item.title}</Link></td>
                              <td>{renderHTML(item.description)}</td>
                              <td>{item.category}</td>
                          </tr>
                        ))}
                    </tbody>
                </table>
                </div>
        )
    }
  }

  export default List;