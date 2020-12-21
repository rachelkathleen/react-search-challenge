import { ProfileContext } from './ProfilesContextProvider';
import React from 'react';
import FittedImage from 'react-fitted-image';
import '../styles/ProfilePage.scss';

class ProfilePage extends React.Component {
  static contextType = ProfileContext;
  handleSortAscending = () => {
    this.context.dispatch({ type: 'ascending' });
  };

  render() {
    return <main className="profile-page--container">{this.findProfile()}</main>;
  }

  renderProfileInfo() {
    const id = this.props.match.params.id;
    const profile = this.context.profiles.find((profile) => profile.id === parseInt(id));

    return (
      <>
        {this.renderTopSection(profile)}
        {this.renderSummarySection(profile)}
        {this.renderAdditionalPhotos(profile)}
      </>
    );
  }

  renderTopSection(profile) {
    const { contact, name, species, status, url } = profile;
    const { city, state } = contact.address;
    const ariaLabel = `${name} ${status} ${species} in ${city}, ${state}`;
    return (
      <section className="section">
        <div className="profile-image">
          <a aria-label={ariaLabel} href={profile.url} target="blank">
            <FittedImage {...this.getPrimaryImageProps(profile)} />
          </a>
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
              <h3>Their summary</h3>
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
            <a href={photo.full} target="blank">
              <FittedImage {...this.getImageProps(photo, index)} />
            </a>
          ))}
        </section>
      );
    }

    return content;
  }

  getPrimaryImageProps(profile) {
    const { name, photos } = profile;

    return {
      ariaDescribedby: 'something',
      alt: `Photo of ${name}`,
      fit: 'cover',
      src: photos[0].medium,
    };
  }

  getImageProps(photo, index) {
    return {
      alt: `${index + 1}`,
      className: 'profile-images--photo',
      fit: 'cover',
      key: index,
      src: photo.small,
    };
  }

  findProfile() {
    const id = this.props.match.params.id;
    const profile = this.context.profiles.find((profile) => profile.id === parseInt(id));
    let content;

    if (profile) {
      content = this.renderProfileInfo();
    } else
      content = (
        <section className="section">
          <h1>Loading...</h1>
        </section>
      );

    return content;
  }
}
export default ProfilePage;
