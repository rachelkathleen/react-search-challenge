import FittedImage from 'react-fitted-image';
import React from 'react';
import '../styles/SearchCard.scss';

export default class Search extends React.PureComponent {
  render() {
    const { photoUrl = '', handle = '', age = '', photoCount = 0 } = this.props;

    return (
      <div
        className="search-card"
        ariaLabel={`Profile for ${handle}, ${age}, ${photoCount} photos`}
      >
        <div className="search-card--content">
          <div className="search-card--avatar">
            <FittedImage fit="cover" src={photoUrl} alt={`photo of ${handle}`} />
            <div className="search-card--details">
              <div className="search-card--details_two">
                <div className="search-card--details_three">
                  <h6 className="search-card--details--handle">{handle}</h6>
                  <div className="search-card--details--age">
                    {age}
                    <div className="search-card--details--photo-count">
                      {photoCount > 1 && photoCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
