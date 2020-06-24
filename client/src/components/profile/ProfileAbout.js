import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import PropTypes from "prop-types";
class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    const firstName = profile.user.name.trim().split(" ")[0];

    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" />
        {skill}
      </div>
    ));

    return (
      <div>
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{firstName}'s Bio</h2>
          <p>
            {isEmpty(profile.bio) ? (
              <span>{firstName} doesn't have bio</span>
            ) : (
              <span>{profile.bio}</span>
            )}
          </p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">{skills}</div>
        </div>
      </div>
    );
  }
}
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};
export default ProfileAbout;
