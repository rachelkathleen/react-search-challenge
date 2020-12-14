import { Link } from 'react-router-dom';
import { ProfileContext } from './ProfilesContextProvider';
import React from 'react';
import MinimalButton from './MinimalButton';
import SearchCard from './SearchCard';
import '../styles/SearchPage.scss';

class SearchPage extends React.Component {
  static contextType = ProfileContext;

  render() {
    return (
      <main className="search-page">
        {this.renderButtons()}
        {this.renderProfiles()}
      </main>
    );
  }

  renderButtons() {
    return (
      <div className="search-page--buttons">
        <MinimalButton disabled>
          <img src="filter.svg" width={22} alt="filter" />
        </MinimalButton>

        <MinimalButton onClick={this.handleSortAscending}>
          <img src="./ascending.svg" width={22} alt="Sort ascending" />
        </MinimalButton>

        <MinimalButton onClick={this.handleSortDescending}>
          <img src="./descending.svg" width={22} alt="Sort descending" />
        </MinimalButton>
      </div>
    );
  }

  renderProfiles() {
    const { profiles = [] } = this.context;
    console.log(profiles);
    return (
      <div className="search-page--content">
        {profiles.map((profile) => (
          <Link key={profile.id} to={`/profiles/${profile.id}`}>
            <SearchCard {...this.getSearchCardProps(profile)} />
          </Link>
        ))}
      </div>
    );
  }

  getSearchCardProps(profile) {
    const { age, name, id, location, photos } = profile;

    return {
      age,
      handle: name,
      key: id,
      location,
      photoCount: photos.length,
      photoUrl: photos[0].large,
    };
  }

  handleSortAscending = () => {
    this.context.dispatch({ type: 'ascending' });
  };

  handleSortDescending = () => {
    this.context.dispatch({ type: 'descending' });
  };
}

export default SearchPage;
