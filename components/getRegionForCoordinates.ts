export const calculateDeltas = ({ lat, lng }) => {
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;

  const latitudeDelta = 1000 / oneDegreeOfLatitudeInMeters;
  const longitudeDelta = 1000 /
    (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

  return {
    latitude: lat,
    longitude: lng,
    latitudeDelta,
    longitudeDelta,
  };
};
