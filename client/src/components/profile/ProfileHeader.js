import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="">
        <div className="profile-grid my-1">
          <div className="profile-top bg-primary p-2">
            <img
              className="round-img my-1"
              src={profile.user.avatar}
              alt={profile.user.name}
            />
            <h1 className="large">{profile.user.name}</h1>
            <p className="lead">
              {profile.status}
              {isEmpty(profile.company) ? null : (
                <span> at {profile.company}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span> at {profile.loaction}</span>
              )}
            </p>

            <div className="icons my-1">
              {isEmpty(profile.website) ? null : (
                <Link
                  to={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-globe fa-2x"></i>
                </Link>
              )}
              {isEmpty(profile.social && profile.social.twitter) ? null : (
                <Link
                  to={profile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter fa-2x"></i>
                </Link>
              )}
              {isEmpty(profile.social && profile.social.facebook) ? null : (
                <Link
                  to={profile.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook fa-2x"></i>
                </Link>
              )}
              {isEmpty(profile.social && profile.social.linkedin) ? null : (
                <Link
                  to={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin fa-2x"></i>
                </Link>
              )}
              {isEmpty(profile.social && profile.social.youtube) ? null : (
                <Link
                  to={profile.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube fa-2x"></i>
                </Link>
              )}
              {isEmpty(profile.social && profile.social.instagram) ? null : (
                <Link
                  to={profile.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram fa-2x"></i>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileHeader;
