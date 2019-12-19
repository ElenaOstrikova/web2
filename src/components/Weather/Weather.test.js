import React from "react";
import renderer from "react-test-renderer";

import Weather from "./Weather";


describe("<Weather /> render", () => {

  const DEFAULT_FORECAST = {
    cityName: "Moscow",
    temperature: "-4",
    icon: "icon_code",
    windSpeed: 10,
    description: "nice to swim",
    pressure: 234,
    humidity: 99,
    coords: {
      lat: 40,
      lon: 40
    }
  };

  test("should has forecast and delete button", () => {
    const tree = renderer
      .create(
        <Weather
          onFetch={() => {}}
          onDelete={() => {}}
          forecast={DEFAULT_FORECAST}
        />)
      .toJSON();
    
    expect(tree).toMatchSnapshot();
  });
  
  test("should has forecast and no delete button", () => {
    const tree = renderer
      .create(
        <Weather
          onFetch={() => {}}
          forecast={DEFAULT_FORECAST}
        />)
      .toJSON();
    
    expect(tree).toMatchSnapshot();
  });

  test("should has <Loader />", () => {
    const tree = renderer
      .create(
        <Weather
          onFetch={() => {}}
        />)
      .toJSON();
    
    expect(tree).toMatchSnapshot();
  });

  test("should has <Loader /> even if onDelete given", () => {
    const tree = renderer
      .create(
        <Weather
          onFetch={() => {}}
          onDelete={() => {}}
        />)
      .toJSON();
    
    expect(tree).toMatchSnapshot();
  });

});