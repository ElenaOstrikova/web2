import React from "react";


export default function AddFavorite(props) {
  return (
    <form className="add-favorite" onSubmit={(e) => props.onSubmit(e)}>
      <input className="input" type="text" name="cityName" placeholder="City name" required={true} />
      <input className="button" type="submit" value="Add to favorite"/>
    </form>
  );
}
