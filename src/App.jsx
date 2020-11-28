import React, { useState } from "react";

import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

function App() {
  const [initialAddress, setInitialAddress] = useState("");
  const [finalAddress, setFinalAddress] = useState("");

  const [initialCoordinates, setInitialCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const [finalCoordinates, setFinalCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const initialHandleSelect = async (value) => {
    const res = await geocodeByAddress(value);
    let latLng = await getLatLng(res[0]);
    setInitialAddress(value);
    setInitialCoordinates(latLng);
  };

  const finalHandleSelect = async (value) => {
    const res = await geocodeByAddress(value);
    let latLng = await getLatLng(res[0]);
    setFinalAddress(value);
    setFinalCoordinates(latLng);
    fetchDistance();
  };

  // `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${initialCoordinates.lat},${initialCoordinates.lng}8&destinations=${finalCoordinates.lat},${finalCoordinates.lng}&mode=driving&language=en-EN&sensor=false&key=AIzaSyCCwXhF5unk2wA2q3KGAoB6sy7UTSOOKhQ`

  // fetch distance
  function fetchDistance() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=54.406505,18.67708&destinations=54.446251,18.570993&mode=driving&language=en-EN&sensor=false&key=AIzaSyCCwXhF5unk2wA2q3KGAoB6sy7UTSOOKhQ`,
      {
        //mode: 'no-cors',
        credentials: "include",
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json)
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <PlacesAutoComplete
        value={initialAddress}
        onChange={setInitialAddress}
        onSelect={initialHandleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: "Enter location" })} />

            <div>
              {loading ? <div>...loading</div> : null}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutoComplete>
      <p className="lat">Lat: {initialCoordinates.lat}</p>
      <p className="lat">Lng: {initialCoordinates.lng}</p>

      {/* final point location pickup */}
      <PlacesAutoComplete
        value={finalAddress}
        onChange={setFinalAddress}
        onSelect={finalHandleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: "Enter location" })} />

            <div>
              {loading ? <div>...loading</div> : null}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutoComplete>
      <p className="lat">Final Lat: {finalCoordinates.lat}</p>
      <p className="lat">Final Lng: {finalCoordinates.lng}</p>
    </div>
  );
}

export default App;
