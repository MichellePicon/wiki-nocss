import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'; //withRouter para volver cuando den click en submit
import { withFirebase } from './Firebase';
 
const SignUpPage = () => (
  <div>
    <h1>¡Regístrate!</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };
 
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push("/"); 
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

      const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
          <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Nombre"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="ejemplo@correo.com"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Contraseña"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirma Contraseña"
        />
        <h4><button disabled={isInvalid} type="submit" class="btn btn-primary"> Registrarse </button></h4>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const SignUpLink = () => (
  <p>
    ¿Aún no tienes una cuenta? <Link to="/Signup">Registrarse</Link>
  </p>
);
 
const SignUpForm = withRouter(withFirebase(SignUpFormBase)); // El WithRouter es para volver cuando se complete el submit

export default SignUpPage;
 
export { SignUpForm, SignUpLink };