import { TPoint } from "./useRandomLocations";
import { useEffect, useRef } from "react";
import { useState } from "react";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import config from "../../env";

const useMap = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [map, setMap] = useState<Map | null>(null);
  const currentMarkers = useRef<Marker[]>([]);

  const initMap = () => {
    setLoading(true);
    mapboxgl.accessToken = config.MAPBOX_APU_KEY;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 5,
    });
    setMap(map);
  };

  const addNewMarker = (location: TPoint) => {
    if (!map) {
      return;
    }
    currentMarkers.current.push(
      new mapboxgl.Marker().setLngLat(location).addTo(map)
    );
  };

  const removeAllMarkers = () => {
    currentMarkers.current.forEach((maker) => maker.remove());
  };

  const destroyMap = () => setMap(null);

  useEffect(() => {
    map?.on("load", function () {
      setLoading(false);
    });
  }, [map]);

  return {
    loading,
    initMap,
    map,
    destroyMap,
    addNewMarker,
    currentMarkers,
    removeAllMarkers,
  };
};

export default useMap;
