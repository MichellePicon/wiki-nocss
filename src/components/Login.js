import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
 
import { SignUpLink } from './Signup';
import { withFirebase } from './Firebase';
 
const SignInPage = () => (
  <div>
    <h1>Iniciar Sesión</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { email, password, error } = this.state;
 
    const isInvalid = password === '' || email === '';
 
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="ejemplo@correo.com"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Contraseña"
        />
        <h4><button disabled={isInvalid} type="submit" class="btn btn-primary"> Ingresar </button></h4>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const SignInForm = withRouter(withFirebase(SignInFormBase));
 
export default SignInPage;
 
export { SignInForm };