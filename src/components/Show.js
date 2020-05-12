import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import { Link } from 'react-router-dom';
import AuthUserContext from './Session/context';
import renderHTML from 'react-render-html';

class Show extends Component {

  constructor(props) {
    super(props);
    this.users = this.props.firebase.users();
    this.state = {
      Post: {},
      key: '',
      authUser: null,
    };
  }

  componentDidMount() {
    const ref = this.props.firebase.firestored().doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          Post: doc.data(),
          key: doc.id,
          isLoading: false,
        });
      } else {
        console.log("Error");
      }
    });

    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser ? this.setState({ authUser}) : this.setState({ authUser: null }); 
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  delete(id){
    this.props.firebase.firestored().doc(id).delete().then(() => {
      console.log("Success");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error", error);
    });
  }

  flag(value){
    return value ? renderHTML(value) : console.log('nel');
  };

  render() {
    return (
      <AuthUserContext.Provider value={this.state.authUser, this.users}>
        <div>
          <AuthUserContext.Consumer>
          {this.state.authUser, user =>{
              //authUser ? <this.NavigationAuth/> : <this.NavigationNonAuth/>
              if(this.state.authUser && (user.currentUser.email == "someone@gmail.com"))
              {
                return <this.NavigationAdmin/>
              }else if(this.state.authUser)
              {
                return <this.NavigationAuth/>
              }else
              {
                return <this.NavigationNonAuth/>
              };
            }
            }
          </AuthUserContext.Consumer>
        </div>
      </AuthUserContext.Provider>
    );
  }

  NavigationAdmin = () => (
    <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
              <br></br>
          <h4><Link to="/" class="btn btn-primary" >Volver</Link></h4>
            <br></br>
            <h3 class="panel-title">
              {this.state.Post.title}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Contenido</dt>
              <dd>{this.flag(this.state.Post.description)}</dd>
              <dt>Categoría</dt>
              <dd>{this.state.Post.category}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Editar</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Eliminar</button>
          </div>
        </div>
      </div>
  );

  NavigationAuth = () => (
    <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
              <br></br>
          <h4><Link to="/" class="btn btn-primary" >Volver</Link></h4>
            <br></br>
            <h3 class="panel-title">
              {this.state.Post.title}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Contenido</dt>
              <dd>{this.flag(this.state.Post.description)}</dd>
              <dt>Categoría</dt>
              <dd>{this.state.Post.category}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Editar</Link>&nbsp;
          </div>
        </div>
      </div>
  );

  NavigationNonAuth = () => (
    <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
              <br></br>
          <h4><Link to="/" class="btn btn-primary" >Volver</Link></h4>
            <br></br>
            <h3 class="panel-title">
              {this.state.Post.title}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Contenido</dt>
              <dd>{this.flag(this.state.Post.description)}</dd>
              <dt>Categoría</dt>
              <dd>{this.state.Post.category}</dd>
            </dl>
          </div>
        </div>
      </div>
  );

}

export default withFirebase(Show);
