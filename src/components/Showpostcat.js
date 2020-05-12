import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import { Link } from 'react-router-dom';
import AuthUserContext from './Session/context';
import List from './Searchbar';

class Showpostcat extends Component {

  constructor(props) {
    super(props);
    this.ref = this.props.firebase.firestored();
    this.ref2 = this.props.firebase.firestorec();
    this.users = this.props.firebase.users();
    this.unsubscribe = null;
    this.state = {
      Post: {},
      key: '',
      posts: [],
      authUser: null,
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const catref = this.props.match.params.id;
    const posts = [];
    console.log(catref);
    querySnapshot.forEach((doc) => {
      if (doc.data().category==catref) {
        const { title, description, author, category } = doc.data();
        posts.push({
          key: doc.id,
          doc, // DocumentSnapshot
          title,
          description,
          author,
          category,
        });
      }
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

  delete(id){
    this.ref2.doc(id).delete().then(() => {
      console.log("Success");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error", error);
    });
    const catref = this.props.match.params.id;
     this.state.posts.forEach((doc) => {
      this.ref.doc(doc.key).delete().then(() => {
          console.log("Success");
          this.props.history.push("/")
        }).catch((error) => {
          console.error("Error", error);
        });
     });
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
              }else
              {
                return <this.NavigationNotAdmin/>
              };
            }
            }
          </AuthUserContext.Consumer>
        </div>
      </AuthUserContext.Provider>
    );
  }

  NavigationAdmin = () =>(
    <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          </div>
          <div class="panel-body">
            <br></br>
            <h4><Link to="/" class="btn btn-primary">Inicio</Link></h4>
            <h4><Link to="/showcategory" class="btn btn-primary">Categorías</Link></h4>
            <br></br>
    <h3 class="panel-title">Publicaciones de {this.props.match.params.id}</h3>
    <button onClick={this.delete.bind(this, this.props.match.params.id)} class="btn btn-danger">Eliminar</button>
    <List items={this.state.posts} />
          </div>
        </div>
      </div>
  );

  NavigationNotAdmin = () =>(
    <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          </div>
          <div class="panel-body">
            <br></br>
            <h4><Link to="/" class="btn btn-primary">Inicio</Link></h4>
            <h4><Link to="/showcategory" class="btn btn-primary">Categorías</Link></h4>
            <br></br>
            <h3 class="panel-title">Publicaciones de {this.props.match.params.id}</h3>
            <List items={this.state.posts} />
          </div>
        </div>
      </div>
  );

}


export default withFirebase(Showpostcat);
