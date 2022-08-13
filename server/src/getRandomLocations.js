const DECIMAL = 6;

const getRandomFloat = (min, max, decimals) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
};

const getRandomLocation = (southWest, northWest) => ([
  getRandomFloat(southWest.lng, northWest.lng, DECIMAL),
  getRandomFloat(southWest.lat, northWest.lat, DECIMAL),
]);

const getRandomLocations = (southWest, northWest, count) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(getRandomLocation(southWest, northWest));
  }
  return arr;
};

const getCenter = (southWest, northWest) => [
  (southWest.lng + northWest.lng) / 2,
  (southWest.lat + northWest.lat) / 2,
];

const DEFAULT_PARAMS = {
  southWest: {
    lng: 15.126905,
    lat: 44.541239,
  },
  northWest: {
    lng: 15.17278,
    lat: 44.605633,
  },
  count: 1,
};

export { getRandomLocations, getCenter, DEFAULT_PARAMS };
