import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import '../../styles/nav.scss';

const mapStateToProps = state =>
   ({
     currentLocation: state.currentLocation,
     currentRoot: state.currentRoot,
     routing: state.routing,
   });

const mapDispatchToProps = dispatch => ({
  goHome: () => {
    dispatch(push('/'));
  },
});

class NavBar extends Component {
  render() {
    const localRoot = this.props.currentRoot.currentRoot;
    const currentCity = this.props.currentLocation.city;
    const pathName = this.props.routing.locationBeforeTransitions.pathname;

    let navBar = null;

    if (pathName === `/${currentCity}` && pathName.length > 1) {
      navBar = (
        <div>
          <img src={'images/trip-pic.jpg'} styleName="planBg" />
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <a className="navbar-brand" onClick={() => this.props.goHome()}>TRIP_RAPTOR
            <span> | Plan Your Trip To {currentCity}</span>
            </a>
            </div>
          </nav>
        </div>);
    } else if (pathName.includes(`/${currentCity}/${localRoot}`)) {
      navBar = (
        <div>
          <img src={'images/trip-pic.jpg'} styleName="planBg" />
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <a className="navbar-brand" onClick={() => this.props.goHome()}>TRIP_RAPTOR
            <span> | Choose {localRoot} You Like</span>
            </a>
            </div>
          </nav>
        </div>);
    } else {
      navBar = (
        <div>
          <img src={'images/trip-pic2.jpg'} styleName="mainBg" />
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <a className="navbar-brand" onClick={() => this.props.goHome()}>TRIP_RAPTOR</a>
            </div>
          </nav>
        </div>);
    }
    return (
      <div>
        {navBar}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
