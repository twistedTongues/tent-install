import { useState } from "react";

const useZoomHook = (mapRef, selectedRegion, setSelectedRegion) => {
  const maxZoomLevel = 20;
  const minZoomLevel = 3;
  const [zoom, setZoom] = useState(14);

  const handleZoom = (isZoomIn = false) => {
    let currentZoomLevel = zoom;
    // if zoomlevel set to max value and user click on minus icon, first decrement the level before checking threshold value
    if (!isZoomIn && currentZoomLevel === maxZoomLevel) {
      currentZoomLevel -= 1;
    } // if zoomlevel set to min value and user click on plus icon, first increment the level before checking threshold value
    else if (isZoomIn && currentZoomLevel === minZoomLevel) {
      currentZoomLevel += 1;
    }
    if (
      currentZoomLevel >= maxZoomLevel ||
      currentZoomLevel <= minZoomLevel
    ) {
      return;
    }

    currentZoomLevel = isZoomIn ? currentZoomLevel + 1 : currentZoomLevel - 1;
    const zoomedInRegion = {
      ...selectedRegion,
      latitudeDelta: getLatLongDelta(
        currentZoomLevel,
        selectedRegion.latitude,
      )[1],
      longitudeDelta: getLatLongDelta(
        currentZoomLevel,
        selectedRegion.latitude,
      )[0],
    };

    setSelectedRegion(zoomedInRegion);
    setZoom(currentZoomLevel);
    mapRef?.current?.animateToRegion(zoomedInRegion, 100);
  };

  const getLatLongDelta = (zoom: number, latitude: number): number[] => {
    const LONGITUDE_DELTA = Math.exp(Math.log(360) - zoom * Math.LN2);
    const ONE_LATITUDE_DEGREE_IN_METERS = 111.32 * 1000;
    const accurateRegion = LONGITUDE_DELTA *
      (ONE_LATITUDE_DEGREE_IN_METERS * Math.cos(latitude * (Math.PI / 180)));
    const LATITUDE_DELTA = accurateRegion / ONE_LATITUDE_DEGREE_IN_METERS;

    return [LONGITUDE_DELTA, LATITUDE_DELTA];
  };

  return { zoom, handleZoom, minZoomLevel, maxZoomLevel };
};

export default useZoomHook;
