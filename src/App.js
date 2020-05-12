import React, { Component } from 'react';
import { Link, Router } from 'react-router-dom';
import './App.css';
import LogoutButton from './components/Logout';
import List from './components/Searchbar';
import { withFirebase } from './components/Firebase';
import AuthUserContext from './components/Session/context';

class App extends Component {
  constructor(props) {
    super(props);
    //this.ref = firebase.firestore().collection('notes');
    this.ref = this.props.firebase.firestored();
    this.users = this.props.firebase.users();
    this.unsubscribe = null;
    this.state = {
      posts: [],
      authUser: null,
      email: ""
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author, category } = doc.data();
      posts.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
        category,
      });
    });
    this.setState({
      posts
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
 
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser ? this.setState({ authUser}) : this.setState({ authUser: null }); 
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }

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

  NavigationAdmin= () => (
    <div class="container">
        <div class="panel panel-default">
            <div class="panel-body">
                <br></br>
                <h4><Link to="/showcategory" class="btn btn-primary">Categorías</Link></h4>
                <h4><Link to="/Createcategory" class="btn btn-primary">Nueva categoria</Link></h4>
                <h4><Link to="/create" class="btn btn-primary">Nuevo Post</Link></h4>
                <h4><Link to="/Passwordchange" class="btn btn-primary">Cambiar contraseña</Link></h4>
                <h4><LogoutButton/></h4>
                <br></br>
                <h3 class="panel-title">Hola Admin: {this.users.currentUser.email}</h3>
                <br></br>
                <List items={this.state.posts} />
            </div>
        </div>
    </div>
);


  NavigationAuth = () => (
      <div class="container">
          <div class="panel panel-default">
              <div class="panel-body">
                  <br></br>
                  <h4><Link to="/showcategory" class="btn btn-primary">Categorías</Link></h4>
                  <h4><Link to="/create" class="btn btn-primary">Nuevo Post</Link></h4>
                  <h4><Link to="/Passwordchange" class="btn btn-primary">Cambiar contraseña</Link></h4>
                  <h4><LogoutButton/></h4>
                  <br></br>
                  <h3 class="panel-title">Hola {this.users.currentUser.email}</h3>
                  <br></br>
                  <List items={this.state.posts} />
              </div>
          </div>
      </div>
  );
  
  NavigationNonAuth = () => (
      <div class="container">
      <div class="panel panel-default">
          <div class="panel-body">
              <br></br>
              <h4><Link to="/Login" class="btn btn-primary">Iniciar Sesión</Link></h4>
              <h4><Link to="/showcategory" class="btn btn-primary">Categorías</Link></h4>
              <List items={this.state.posts} />
              <br></br>
          </div>
      </div>
  </div>
  );

}

export default withFirebase(App);
