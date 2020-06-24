import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul navbar-nav ml-auto>
        <li className="nav-item">
          <a
            href="/#"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="rounded-circle"
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have gravtar"
            />
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="navbar-brand"></i> DevConnector
          </Link>
        </h1>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/profiles">
              Developers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/feed">
              Posts Feed
            </Link>
          </li>
        </ul>
        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
