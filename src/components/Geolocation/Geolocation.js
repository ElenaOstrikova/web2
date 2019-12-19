import React from "react";
import { connect } from "react-redux";

import { setGeolocation, fetchWeatherByCoords, getGeoError } from "../../actions/locationActions";
import Weather from "../Weather/Weather";

import "./Geolocation.css";


class Geolocation extends React.Component {
  componentDidMount() {
    this.getGeolocation();
  }

  render() {
    return (
        <div className="geolocation">
          <h1 className="header">Refresh geolocation</h1>
          <button className="button"
                  onClick={() => this.handleClick()}
          >Get geolocation</button>
          {!this.props.error ? this.props.coords && (
              <Weather
                  onFetch={() => this.props.fetchWeatherByCoords(this.props.coords)}
                  forecast={this.props.forecast}/>
          ) : (
              <div className="error">Error: {this.props.error}</div>
          )}
        </div>
    );
  }

  handleClick() {
    this.getGeolocation();
  }

  getGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
            const coords = {
              lat: position.coords.latitude,
              lon: position.coords.longitude
            };
            this.props.setGeolocation(coords);
            this.props.fetchWeatherByCoords(this.props.coords);
          },
          () => {
            this.props.setGeolocation({lat: 43.02, lon: 44.68});
            this.props.fetchWeatherByCoords(this.props.coords);
          });
    } else {
      this.props.fetchGeoError("your browser does not support geolocation");
    }
  }
}


function mapStateToProps(state) {
  return {
    coords: state.geo.coords,
    forecast: state.geo.forecast,
    error: state.geo.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setGeolocation: coords => dispatch(setGeolocation(coords)),
    fetchWeatherByCoords: coords => dispatch(fetchWeatherByCoords(coords)),
    fetchGeoError: error => dispatch(getGeoError(error)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Geolocation);
