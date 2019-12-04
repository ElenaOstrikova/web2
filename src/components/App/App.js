import React from "react";
import Geolocation from "../Geolocation/Geolocation";
import Favorites from "../Favorites/Favorites";

class App extends React.Component{
    render(){
        return(
            <div>
                <Geolocation />
                <Favorites />
            </div>
        )
    }
}

export default App;