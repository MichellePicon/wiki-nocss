import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Database';
import { Link } from 'react-router-dom';

class Createcategory extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('categorias');
    this.state = {
      title: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title} = this.state;

    this.ref.doc(title).set({
      title
    }).then((docRef) => {
      this.setState({
        title: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error", error);
    });
  }

  render() {
    const { title} = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Creando nueva categoría
            </h3>
          </div>
          <div class="panel-body">
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Título</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Nombre de Categoría" />
              </div>
              <button type="submit" class="btn btn-success">Agregar</button>
            </form>
            <br></br>
            <h4><Link to="/" class="btn btn-primary">Volver</Link></h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Createcategory;
