import { ProfileContext } from './ProfilesContextProvider';
import React from 'react';
import FittedImage from 'react-fitted-image';
import '../styles/ProfilePage.scss';

class ProfilePage extends React.Component {
  static contextType = ProfileContext;

  render() {
    const id = this.props.match.params.id;
    const profile = this.context.profiles.find((profile) => profile.id === parseInt(id));

    return (
      <main className="profile-page--container">
        {this.renderTopSection(profile)}
        {this.renderSummarySection(profile)}
        {this.renderAdditionalPhotos(profile)}
      </main>
    );
  }

  renderTopSection(profile) {
    return (
      <section className="section">
        <div className="profile-image">
          <FittedImage {...this.getPrimaryImageProps(profile)} />
        </div>
        {this.renderTopRight(profile)}
      </section>
    );
  }

  renderTopRight(profile) {
    const { contact, gender, size, species } = profile;
    const { city, state } = contact.address;

    return (
      <div className="profile-info">
        <div className="profile-info--name">
          <h2>{profile.name}</h2>
        </div>
        <div className="profile-info--details">
          {profile.age} • {city}, {state}
        </div>
        <div className="profile-info--details">
          {gender} • {size} • {species}
        </div>
      </div>
    );
  }

  renderSummarySection(profile) {
    let content = null;

    if (profile.description) {
      content = (
        <section className="section">
          <div className="profile-summary">
            <div className="profile-summary--headline">
              <h4>Their summary</h4>
            </div>
            <div className="profile-summary--description">
              <p>{profile.description}</p>
            </div>
          </div>
        </section>
      );
    }
    return content;
  }

  renderAdditionalPhotos(profile) {
    const { photos } = profile;
    let content = null;

    if (photos.length > 1) {
      photos.shift();
      content = (
        <section className="section">
          <div className="profile-images"></div>
          {photos.map((photo, index) => (
            <FittedImage {...this.getImageProps(photo, index)} />
          ))}
        </section>
      );
    }

    return content;
  }

  getPrimaryImageProps(profile) {
    const { name, photos } = profile;

    return {
      alt: `Photo of ${name}`,
      fit: 'cover',
      src: photos[0].medium,
    };
  }

  getImageProps(photo, index) {
    return {
      alt: `image ${index + 1}`,
      className: 'profile-images--photo',
      fit: 'cover',
      key: index,
      src: photo.small,
    };
  }
}

export default ProfilePage;
