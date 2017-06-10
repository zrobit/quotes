import React, {Component} from 'react';

class ProfileSection extends Component {
  render() {
    return (
      <div className="profile">
        <div className="profile-cover"/>
        <div className="profile-detail">
          <div className="profile-avatar">
            <img src="/assets/media/images/avatar.png"/>
          </div>
          <div className="profile-info">
            <h2>User Name</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileSection;
