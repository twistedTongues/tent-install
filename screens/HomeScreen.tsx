import { useEffect, useRef, useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import client from "../sanity/lib/client";
import AddTentModal from "../components/AddTentModal";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import useZoomHook from "../components/useZoomHook";
import { useMyLocation } from "../components/useMyLocation";
import { Tent } from "../typings";
import { calculateDeltas } from "../components/getRegionForCoordinates";
import MarkerModal from "../components/MarkerModal";
import { urlForImage } from "../sanity/lib/image";

const Home = () => {
  const [selectedRegion, setSelectedRegion] = useState({
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [marker, setMarker] = useState(null);
  const [isButtonVisible, setButtonVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [tents, setTents] = useState<Tent[]>([]);
  const mapRef = useRef(null);

  const query = `*[_type == "tent"]`;

  useEffect(() => {
    client.fetch(query).then((data) => {
      setTents(data);
    });
  }, []);

  const { zoom, handleZoom, minZoomLevel, maxZoomLevel } = useZoomHook(
    mapRef,
    selectedRegion,
    setSelectedRegion,
  );

  const addNewTentPlace = (e) => {
    setMarker(e.nativeEvent.coordinate);
    console.log(marker);
    setButtonVisible(true);
  };

  const initialRegion = useMyLocation();
  const goToMe = () => {
    mapRef.current?.animateToRegion(initialRegion, 3 * 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-violetblue">
      <MapView
        className="w-full h-full"
        initialRegion={selectedRegion}
        ref={mapRef}
        mapType="satellite"
        loadingEnabled={true}
        onPress={addNewTentPlace}
        onRegionChangeComplete={(region) => setSelectedRegion(region)}
      >
        <Marker
          coordinate={selectedRegion}
        />
        {marker && (
          <Marker
            draggable
            coordinate={marker}
          />
        )}
        {tents.map((tent) => (
          <Marker
            key={tent._id}
            pinColor="green"
            coordinate={calculateDeltas(tent.location)}
          >
            <Callout tooltip>
              <View className="flex items-center justify-center p-10 bg-tertiary rounded-xl opacity-80">
                <Text className="text-cultured tracking-wide font-bold">
                  {tent.title}
                </Text>
                <Text className="text-cultured tracking-wide font-semibold">
                  Rating:{" "}
                  <Text className="text-inchworm font-bold underline">
                    {tent.rating}
                  </Text>
                  <AntDesign name="star" size={17} color="yellow" />
                </Text>
                <Text className="text-cultured tracking-wide font-semibold">
                  Capacity:{" "}
                  <Text className="text-inchworm font-bold underline">
                    {tent.capacity}
                  </Text>
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity
        className={`absolute p-2 m-2 bg-black top-1/2 right-0 rounded-lg ${
          zoom === maxZoomLevel ? "opacity-40" : "opacity-80"
        }`}
        onPress={() => handleZoom(true)}
        disabled={zoom === maxZoomLevel}
      >
        <MaterialCommunityIcons name="plus" size={32} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        className={`absolute p-2 m-2 bg-black top-1/2 right-0 mt-16 rounded-lg ${
          zoom === minZoomLevel ? "opacity-40" : "opacity-80"
        }`}
        onPress={() => handleZoom()}
        disabled={zoom === minZoomLevel}
      >
        <MaterialCommunityIcons name="minus" size={32} color="white" />
      </TouchableOpacity>

      {isModalVisible && (
        <AddTentModal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          setButtonVisible={setButtonVisible}
          setMarker={setMarker}
          marker={marker}
        />
      )}
      <Pressable
        className="absolute bottom-0 right-0 bg-black opacity-80 rounded-full p-2 m-2"
        onPress={goToMe}
      >
        <MaterialIcons name="near-me" size={32} color="white" />
      </Pressable>
      {isButtonVisible && (
        <Pressable
          className="absolute bottom-0 bg-black opacity-80 rounded-full p-2 m-2"
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="add-location-alt" size={32} color="white" />
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default Home;
