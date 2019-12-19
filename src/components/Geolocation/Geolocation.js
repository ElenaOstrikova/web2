import React from "react";
import { connect } from "react-redux";

import { setGeolocation, getWeatherByCoords, getGeoError } from "../../actions/locationActions";
import Weather from "../Weather/Weather";

import "./Geolocation.css";


class Geolocation extends React.Component {
  componentDidMount() {
    this.getGeolocation();
  }

  render() {
    return (
      <div className="geolocation">
        <button className="button"
          onClick={() => this.handleClick()}
        >Get location</button>
        {!this.props.error ? this.props.coords && (
          <Weather
            onFetch={() => this.props.getWeatherByCoords(this.props.coords)}
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
        this.props.getWeatherByCoords(this.props.coords);
      },
      () => {
        this.props.setGeolocation({lat: 51, lon: 39});
        this.props.getWeatherByCoords(this.props.coords);
      });
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
    setGeolocation: (coords) => {
      dispatch(setGeolocation(coords));
    },

    getWeatherByCoords: (coords) => {
      dispatch(getWeatherByCoords(coords));
    },

    fetchGeoError: (error) => {
      dispatch(getGeoError(error));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Geolocation);
