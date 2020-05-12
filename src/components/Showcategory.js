import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import { Link } from 'react-router-dom';

class Showcategory extends Component {
  constructor(props) {
    super(props);
    //this.ref = firebase.firestore().collection('categorias');
    this.ref = this.props.firebase.firestorec();
    this.unsubscribe = null;
    this.state = {
      categorias: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const categorias = [];
    querySnapshot.forEach((doc) => {
      const { title} = doc.data();
      categorias.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title
      });
    });
    this.setState({
      categorias
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          </div>
          <div class="panel-body">
            <br></br>
            <h4><Link to="/" class="btn btn-primary">Inicio</Link></h4>
            <br></br>
            <h3 class="panel-title">Categorías</h3>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {this.state.categorias.map(Post =>
                  <tr>
                    <td><Link to={`/showpostcat/${Post.key}`}>{Post.title}</Link></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Showcategory);
