import React, { Component } from 'react';
 
import { withFirebase } from './Firebase';
import { withRouter, Link } from 'react-router-dom';
 
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
 
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { passwordOne } = this.state;
 
    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;
 
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
 
    return (
      <div>
        <h4><Link to="/" class="btn btn-primary">Volver</Link></h4>
        <h2>Cambiando tu contraseña</h2>
      
      
        <form onSubmit={this.onSubmit}>
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Nueva Contraseña"
          />
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirmar contraseña"
          />
          <h4><button disabled={isInvalid} type="submit" class="btn btn-primary">
            Actualizar
          </button></h4>
  
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}
 
export default withRouter(withFirebase(PasswordChangeForm));