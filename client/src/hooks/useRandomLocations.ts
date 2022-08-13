import { useState } from "react";

interface IRandomLocationsParams {
  southWest: {
    lng: number;
    lat: number;
  };
  northWest: {
    lng: number;
    lat: number;
  };
  count: number;
}

export type TPoint = [number, number];

interface ILocationData {
  center: TPoint,
  items: TPoint[]
}

const ENDPOINT = "http://localhost:5050/random-coordinates";

const useRandomLocations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [locationData, setLocationData] = useState<ILocationData>();

  const getRandomLocations = async (
    params: IRandomLocationsParams
  ): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(new Error("Bad response"));
      }

      setLocationData(result);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    locationData,
    loading,
    error,
    getRandomLocations,
  };
};

export default useRandomLocations;
