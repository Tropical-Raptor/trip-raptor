import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Autocomplete from 'react-google-autocomplete';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import NavBar from './nav';
import * as UpdateCurrentLocation from '../actions/update_current_location_action';
import * as UpdateRoot from '../actions/update_root_action';

import '../../styles/place_input.scss';
const mapDispatchToProps = dispatch => ({
  onInputSubmit: (place) => {
    dispatch(UpdateCurrentLocation.updateCurrentLocation(place));
    dispatch(UpdateRoot.updateRoot(place.name));
    dispatch(push(`/${place.name}`));
  },
});

class PlaceInput extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <h1 styleName="ask"> Which city are you going?</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <Autocomplete
                id="AutoForm"
                styleName="autoForm"
                ref="AutoForm"
                placeholder="_________________________"
                componentRestrictions={{ country: [] }}
                onPlaceSelected={(place) => {
                  if (!place.place_id) {
                    alert('Please passing in valid City...');
                  } else {
                    this.props.onInputSubmit(place);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentLocation: state.currentLocation,
  };
}

PlaceInput.propTypes = {
  currentLocation: PropTypes.shape({
    city: React.PropTypes.string,
    id: React.PropTypes.string,
    boundary: React.PropTypes.objectOf(React.PropTypes.objectOf(React.PropTypes.number)),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceInput);

