import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as POIInfo from '../actions/fetch_poi_info_action';
import AddButton from '../containers/addButton';
import RemoveButton from '../containers/removeButton';


// needs to dispatch to itinerary

import '../../styles/poi_details.scss';

// actions: FETCH_POI_INFO

const mapStateToProps = state =>
  ({
    currentCity: state.currentLocation.city,
    itinerary: state.itinerary,
    currentLocation: state.currentLocation,
  });

const mapDispatchToProps = dispatch =>
  ({
    fetchDetails: (placeId, index) => {
      dispatch(POIInfo.fetchPoiDetails(placeId, index));
    },
  });

class POIDetails extends Component {
  // need a way to handle displaying different relevant data
  // (the data to display for hotels may be different than from restaurants)
  componentWillMount() {
    this.props.fetchDetails(this.props.details.place_id, this.props.index);
  }

  // Checking unique id exists in itinerary
  isInsideItinerary(arr, poi) {
    for (let i = 0; i < arr.length; i++) {
      if (poi.place_id === arr[i].place_id) {
        return true;
      }
    }
    return false;
  }

  render() {
    const selectedDetails = this.props.details;
    const itinerary = this.props.itinerary.itinerary;
    const cityArray = itinerary[this.props.currentCity] || [];
    let image = null;
    let rating = null;
    let formattedAddress = null;
    let formattedPhoneNumber = null;
    let internationalPhoneNumber = null;
    let website = null;
    let button = null;

    if (selectedDetails.photos) {
      image = (
        <div>
          <img
            role="presentation"
            styleName="picDetail"
            src={`${selectedDetails.photos[0].getUrl({ maxWidth: 250, maxHeight: 250 })}`}
          />
        </div>
      );
    } else {
      image = <div />;
    }

    if (selectedDetails.rating) {
      rating = <h4>Rating: {selectedDetails.rating} </h4>;
    } else {
      rating = <div />;
    }

    if (selectedDetails.formatted_phone_number) {
      formattedPhoneNumber = <div><span className="glyphicon glyphicon-phone-alt" aria-hidden="true" />: {selectedDetails.formatted_phone_number}</div>;
    } else {
      formattedPhoneNumber = <div />;
    }

    if (selectedDetails.formatted_address) {
      formattedAddress = <div><span className="glyphicon glyphicon-briefcase" aria-hidden="true" />: {selectedDetails.formatted_address}</div>;
    } else {
      formattedAddress = <div />;
    }

    if (selectedDetails.international_phone_number) {
      internationalPhoneNumber = <div><span className="glyphicon glyphicon-earphone" aria-hidden="true" />: {selectedDetails.international_phone_number}</div>;
    } else {
      internationalPhoneNumber = <div />;
    }

    if (selectedDetails.website) {
      website = <div><span className="glyphicon glyphicon-globe" aria-hidden="true" /> : <span><a target="_blank" rel="noopener noreferrer" href={selectedDetails.website} > Website </a></span></div>;
    } else {
      website = <div />;
    }

    if (cityArray && this.isInsideItinerary(cityArray, selectedDetails)) {
      button = <RemoveButton index={cityArray.indexOf(selectedDetails)} city={this.props.currentCity} details={selectedDetails} />;
    } else {
      button = <AddButton city={this.props.currentCity} details={selectedDetails} />;
    }

    return (
      <div>
        <div>
          <div>
            { image }
          </div>
          <h3>{selectedDetails.name}</h3>
          { rating }
          <div styleName="detailBox">
            { formattedAddress }
            { formattedPhoneNumber }
            { internationalPhoneNumber }
            { website }
          </div>
          { button }
        </div>
      </div>
    );
  }
}

POIDetails.propTypes = {
  // propname: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(POIDetails);
