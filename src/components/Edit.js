import React, { Component } from 'react';
import firebase from '../Database';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.docRef = firebase.firestore().collection('categorias');
    this.unsubscribe= null;
    this.state = {
      key: '',
      title: '',
      description: '',
      category:'',
      categorias:[]
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('notes').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const Post = doc.data();
        this.setState({
          key: doc.id,
          title: Post.title,
          description: Post.description,
          category: Post.category,
        });
      } else {
        console.log("error");
      }
    });
    this.unsubscribe=this.docRef.onSnapshot(this.getCategory);
  }



  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({Post:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, category } = this.state;

    const updateRef = firebase.firestore().collection('notes').doc(this.state.key);
    updateRef.set({
      title,
      description,
      category
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        category:''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error", error);
    });
  }


  getCategory = (querySnapshot) => {

    const categorias=[];

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

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
              <br></br>
            <h3 class="panel-title">
              Editar Post
            </h3>
          </div>
          <div class="panel-body">
            
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Título</label>
                <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Agrega un título a tu post" />
              </div>
              <div class="form-group">
                <label for="description">Contenido</label>
                <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="¿Qué quieres compartir?" />
              </div>
              <div class="form-group" onChange={category => this.onChange(category)}>
                  <select name="category">
                  <option value="" selected="selected">  </option>
                   {this.state.categorias.map(Valor =>
                    <option  value={Valor.title}>{Valor.title}</option>)}
                 </select>
                </div>
              <button type="submit" class="btn btn-success">Publicar</button>
            </form>
            <br></br>
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Volver</Link></h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
