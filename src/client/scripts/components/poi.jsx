import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Overlay, Popover, OverlayTrigger, Button } from 'react-bootstrap';
import * as POIInfo from '../actions/fetch_poi_info_action';
import * as UpdateRoot from '../actions/update_root_action';
import * as UpdateBranch from '../actions/update_branch_titles_action';
import * as UpdateCurrentLeaf from '../actions/update_current_clicked_leaf_action';
import POIDetails from './poi_details';

import '../../styles/poi.scss';

const mapStateToProps = state =>
  // check state
  ({
    currentLocation: state.currentLocation,
    currentRoot: state.currentRoot,
    branchTitles: state.branchTitles,
    POIs: state.POIs,
    currentClickedLeaf: state.currentClickedLeaf,
    routing: state.routing,
  });

const mapDispatchToProps = dispatch => ({
  onBranchCreation: (branchTitle) => {
    dispatch(POIInfo.fetchPoiInfo(branchTitle));
  },
  onUpdateRoot: (city, name, query) => {
    dispatch(UpdateRoot.updateRoot(name));
    dispatch(UpdateBranch.updateBranchTitles(query));
    dispatch(push(`/${city}/${name}`));
  },
  onLeafClick: (city, branchTitle, type, id) => {
    if (id) {
      dispatch(push(`/${city}/${type}/${branchTitle}/${id}`));
      dispatch(UpdateCurrentLeaf.updateCurrentClickedLeaf(branchTitle));
    } else {
      dispatch(push(`/${city}/${type}/${branchTitle}`));
      dispatch(UpdateCurrentLeaf.updateCurrentClickedLeaf(branchTitle));
    }
  },
  goBack: (current, destination) => {
    if (current !== destination) {
      dispatch(UpdateRoot.updateRoot(destination));
      dispatch(push(`/${destination}`));
    } else {
      dispatch(push('/'));
    }
  },
});


class POI extends Component {

  componentWillMount() {
    if (this.props.nodePosition === 'branch') {
      this.props.onBranchCreation(this.props.query);
    }
    if (this.props.nodePosition === 'leaf') {
    }
  }

  render() {
    const hasPOIProp = this.props.POIs[this.props.query];
    const localRoot = this.props.currentRoot.currentRoot;
    const currentCity = this.props.currentLocation.city;
    const showDetail = (
      <Popover id="popover-trigger-click">
        <POIDetails index={this.props.index} details={this.props.details} />
      </Popover>
    );

    let status = null;
    if (this.props.nodePosition === 'root') {
      // if node is a root
      status =
        (
          <div
            onClick={() => this.props.goBack(localRoot, currentCity)}
          >
            <div >
              { localRoot }
            </div>
          </div>
        );
    } else if (hasPOIProp) {
      // if promise is returned inside of branch
      status =
        (
          <div>
            <div
              onClick={
                () => this.props.onUpdateRoot(
                  currentCity,
                  this.props.branchTitle,
                  this.props.POIs[this.props.query],
                )
              }
            >
              {this.props.branchTitle}
            </div>
          </div>
        );
    } else if (this.props.nodePosition === 'leaf') {
      status = (
        <OverlayTrigger trigger="click" delayShow={2800} placement="bottom" overlay={showDetail} rootClose>
          <div
onClick={() => this.props.onLeafClick(currentCity, this.props.query, localRoot, this.props.query)}
            styleName="branchTitle"
          >

            {this.props.branchTitle}

          </div>
        </OverlayTrigger>
        );
    } else {
      // if promise is not returned (and all other cases)
      status = <div> Loading... </div>;
    }
    return (
      <div>
        { status }
      </div>
    );
  }
}

// POI.propTypes = {
//   nodePosition: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
// };

export default connect(mapStateToProps, mapDispatchToProps)(POI);
