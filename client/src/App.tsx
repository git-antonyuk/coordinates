import { useEffect } from "react";
import useMap from "./hooks/useMap";
import useRandomLocations from "./hooks/useRandomLocations";

const params = {
  southWest: {
    lng: 15.126905,
    lat: 44.541239,
  },
  northWest: {
    lng: 18.22278,
    lat: 47.605633,
  },
  count: 100,
};

function App() {
  const { locationData, getRandomLocations, loading } = useRandomLocations();
  const {
    loading: loadingMap,
    initMap,
    map,
    destroyMap,
    addNewMarker,
    removeAllMarkers
  } = useMap();

  const plotCoordinates = async () => {
    await getRandomLocations(params);
  };

  useEffect(() => {
    if (!map) {
      return;
    }
    map?.on("load", () => {
      plotCoordinates();
    });
  }, [map]);

  useEffect(() => {
    if (!locationData) {
      return;
    }
    map?.flyTo({
      center: locationData.center,
    });

    removeAllMarkers();
    locationData.items.forEach((item) => addNewMarker(item));
  }, [locationData]);

  useEffect(() => {
    initMap();
    return () => {
      destroyMap();
    };
  }, []);
  return (
    <>
      <p>Map {loading || loadingMap ? <b>is loading</b> : ""}</p>
      <button disabled={loading || loadingMap} onClick={plotCoordinates}>
        Plot coordinates on map
      </button>
      <div id="map" style={{ width: "100%", height: 500 }}></div>
    </>
  );
}

export default App;
