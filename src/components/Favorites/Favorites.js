import React from "react";
import { connect } from "react-redux";

import AddFavorite from "../AddFavorite/AddFavorite"
import Weather from "../Weather/Weather";
import { addFavorite, deleteFavorite, getWeatherByCityName } from "../../actions/favoriteActions";

import "./Favorites.css";


class Favorites extends React.Component {
  render() {
    return (
      <div className="favorites">
        <h1 className="favorites-header" >Favorites</h1>
        <AddFavorite onSubmit={(e) => this.handleAddFavorite(e)} />
        {this.props.error && <div className="error">Error: {this.props.error}</div>}
        <div className="forecasts">
          {
            [...this.props.favorites.entries()].map((entry) => {
              return (
                <Weather
                  key={entry[0]}
                  onFetch={() => this.props.getWeatherByCityName(entry[0])}
                  onDelete={() => this.props.deleteFavorite(entry[0])}
                  forecast={entry[1]} />
              );
            })
          }
        </div>
      </div>
    );
  }

  handleAddFavorite(e) {
    e.preventDefault();
    const cityName = e.currentTarget.elements.cityName.value;
    this.props.addFavorite(cityName);
  }
}


function mapStateToProps(state) {
  return {
    favorites: state.fav.favorites,
    error: state.fav.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addFavorite: (cityName) => {
      dispatch(addFavorite(cityName));
    },

    deleteFavorite: (cityName) => {
      dispatch(deleteFavorite(cityName)); 
    },

    getWeatherByCityName: (cityName) => {
      dispatch(getWeatherByCityName(cityName));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
