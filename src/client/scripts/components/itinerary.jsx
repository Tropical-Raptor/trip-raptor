import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import * as RemoveFromItinerary from '../actions/remove_from_itinerary_action';
import RemoveButton from '../containers/removeButton';
// import Share from './share';

import '../../styles/itinerary.scss';

const mapStatetoProps = state => ({
  itinerary: state.itinerary,
});


class Itinerary extends Component {
  render() {
    const itineraryLength = Object.keys(this.props.itinerary.itinerary).length;
    const cities = Object.keys(this.props.itinerary.itinerary);
    // if itinerary is empty, with no properties, this container does not display
    if (itineraryLength <= 0) {
      return <div />;
    }

    return (


      <div styleName="listbox">
        {cities.map(city => (
          <ul> <h2>{city} </h2>
            {this.props.itinerary.itinerary[city].map((POI, index) => (
              <li>
                <h3>{ POI.currentRoot }</h3>
                { POI.name }<br />
                { POI.formatted_phone_number }<br />
                { POI.international_phone_number }<br />
                { POI.formatted_address }<br />
                <RemoveButton details={POI} city={city} index={index} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    );
    // the first time the itineraryList is not empty, display a handlebar at the
    // middle right-hand side of the window and shake it to suggest to the user
    // that it should be explored (hovered over)

    // if the itineraryList is not empty, and the handlebar is hovered over,
    // slide out a container from the right-hand side

    // on hover, this container slides out from the right-hand side

    // on blur, this container slides back into the right side of the screen

    // insider the container, render the list of added POIs and the cities they correspond to
    // along the bottom of the container, render the share component <Share></Share>
  }
}

Itinerary.propTypes = {
  itinerary: PropTypes.object,
  // propname: PropTypes.string.isRequired,
};

export default connect(mapStatetoProps /* mapDispatchToProps*/)(Itinerary);
