import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';
import '../../../static/css/user.css';
/**
 * Register
 */
export class Register extends Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    username: '',
    email:'',
    password:'',
    password2: ''
  }

  static propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: 'Passwords do not match' });
    } else {
      const newUser = {
        username,
        password,
        email,
      };
      this.props.register(newUser);
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
      }
    const { username, email, password, password2 } = this.state
    return (


          <div className="container pt-5 mt-3" >
            <div className="d-flex justify-content-center h-100">
              	<div className="card">
              		<div className="card-header">
              			<h3>Sign Up</h3>
              		</div>
              		<div className="card-body">
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
                            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                          </div>
                          <input type="email"
                            className="form-control"
                              name="email"
                              onChange={this.onChange}
                              value={email}
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

                        <div class="input-group form-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                          </div>
                            <input type="password"
                              className="form-control"
                              name="password2"
                              onChange={this.onChange}
                              value={password2}
                            />
                         </div>

                  			 <div class="form-group">
                  					<input type="submit" class="btn btn-warning float-right login_btn" />
                  				</div>
              			</form>
              		 </div>

              		<div class="card-footer">
              			<div class="d-flex justify-content-center links">
              					Already have an account? <Link to="/login" class="text-info">Login</Link>
              			</div>
              		</div>

                </div>
          	</div>
          </div>



    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);
