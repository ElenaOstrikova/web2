import React from "react";
import thunk from "redux-thunk";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import Favorites from "./Favorites";


describe("<Favorites /> render", () => {

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

  const storeCreator = configureStore([thunk]);

  beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue("fake success response")
    });
  });

  afterAll(() => {
    delete global.fetch;
  });

  test("should has error and empty favorites", () => {
    const store = storeCreator({
      fav: {
        error: "test error message",
        favorites: new Map()
      }
    });

    const tree = renderer
      .create(
        <Provider store={store}>
          <Favorites />
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("should has error and favorites with 1 element", () => {
    const store = storeCreator({
      fav: {
        error: "test error message",
        favorites: new Map([["firstCity", DEFAULT_FORECAST]])
      }
    });

    const tree = renderer
    .create(
      <Provider store={store}>
        <Favorites />
      </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("should has empty favorites", () => {
    const store = storeCreator({
      fav: {
        favorites: new Map()
      }
    });

    const tree = renderer
    .create(
      <Provider store={store}>
        <Favorites />
      </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("should has favorites with 1 element", () => {
    const store = storeCreator({
      fav: {
        favorites: new Map([["firstCity", DEFAULT_FORECAST]])
      }
    });

    const tree = renderer
    .create(
      <Provider store={store}>
        <Favorites />
      </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("should has favorites with 2 element", () => {
    const store = storeCreator({
      fav: {
        favorites: new Map([
          ["firstCity", DEFAULT_FORECAST],
          ["secondCity", DEFAULT_FORECAST]])
      }
    });

    const tree = renderer
    .create(
      <Provider store={store}>
        <Favorites />
      </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

});
