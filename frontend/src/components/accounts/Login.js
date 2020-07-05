import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import '../../../static/css/user.css';
/**
 * Login
 */
export class Login extends Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    username: '',
    password:'',
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username,
    this.state.password);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if(this.props.isAuthenticated) {
      return <Redirect to="/" />
    }

    const { username, password } = this.state
    return (

      <div class="container pt-5 mt-3">
      	<div class="d-flex justify-content-center h-100">
      		<div class="card">
      			<div class="card-header">
      				<h3>Login</h3>
      			</div>
      			<div class="card-body">

              <form  onSubmit={this.onSubmit}>

                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                  </div>
                  <input type="text"
                  className="form-control"
                  name="username"
                  onChange={this.onChange}
                  value={username}
                  />
                </div>


      					<div class="input-group form-group">
      						<div class="input-group-prepend">
      							<span class="input-group-text"><i class="fas fa-key"></i></span>
      						</div>
                  <input type="password"
                  className="form-control"
                  name="password"
                  onChange={this.onChange}
                  value={password}
                  />
      					</div>


      					<div class="form-group">
      						<input type="submit" class="btn btn-warning float-right login_btn" />
      					</div>
      				</form>
      			</div>

      			<div class="card-footer">
      				<div class="d-flex justify-content-center links">
      					Don't have an account?<Link to="/register" class="text-info">Register</Link>
      				</div>
      			</div>
      		</div>
      	</div>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
