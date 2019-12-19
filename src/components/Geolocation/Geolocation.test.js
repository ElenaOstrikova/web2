import React from "react";
import thunk from "redux-thunk";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import Geolocation from "./Geolocation";


describe("<Geolocation /> render", () => {

  const DEFAULT_FORECAST = {
    cityName: "New York",
    temperature: "-22",
    icon: "icon_code",
    windSpeed: 15,
    description: "good to stay at home",
    pressure: 234,
    humidity: 1,
    coords: {
      lat: 74,
      lon: 89
    }
  };

  const DEFAULT_COORDS = {
    lat: 12,
    lon: 34
  };

  const storeCreator = configureStore([thunk]);

  beforeAll(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve("fake success response")}
      ))
  });

  afterAll(() => {
    delete global.fetch;
  });

  test("should has only coords", () => {
    const store = storeCreator({
      geo: {
        coords: DEFAULT_COORDS
      }
    });

    const tree = renderer
      .create(
        <Provider store={store}>
          <Geolocation />
        </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("should has coords and forecast", () => {
    const store = storeCreator({
      geo: {
        coords: DEFAULT_COORDS,
        forecast: DEFAULT_FORECAST
      }
    });

    const tree = renderer
      .create(
        <Provider store={store}>
          <Geolocation />
        </Provider>)
      .toJSON();

      expect(tree).toMatchSnapshot();
  });

  test("should has error", () => {
    const store = storeCreator({
      geo: {
        error: "test error message"
      }
    });

    const tree = renderer
      .create(
        <Provider store={store}>
          <Geolocation />
        </Provider>
      )
      .toJSON();

      expect(tree).toMatchSnapshot();
  });

});
