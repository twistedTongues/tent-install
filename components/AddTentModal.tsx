import { Dispatch, SetStateAction, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import RatingBar from "./RatingBar";
import AddImages from "./AddImages";
import Slider from "@react-native-community/slider";
import client from "../sanity/lib/client";

type Props = {
  isModalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  setButtonVisible: Dispatch<SetStateAction<boolean>>;
  setMarker: Dispatch<SetStateAction<null>>;
  marker: {
    latitude: number;
    longitude: number;
  };
};

const AddTentModal = (
  { isModalVisible, setModalVisible, setButtonVisible, setMarker, marker }:
    Props,
) => {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [sliderValue, setSliderValue] = useState(5);

  const submitAddingTent = () => {
    setModalVisible(false);
    setButtonVisible(false);
    setMarker(null);
    const doc = {
      _type: "tent",
      title: text,
      location: {
        _type: "geopoint",
        alt: 0,
        lng: marker.longitude,
        lat: marker.latitude,
      },
      description: description,
      // image
      // rating: 4,
      capacity: sliderValue,
    };

    client.create(doc).then((res) => {
      alert(`Tent was added, with id ${res._id}`);
    });
  };

  return (
    <Modal
      visible={isModalVisible}
      animationType="fade"
    >
      <ScrollView className="bg-cultured">
        <Pressable
          className="flex items-end p-3"
          onPress={() => setModalVisible(false)}
        >
          <MaterialCommunityIcons name="close" size={42} color="black" />
        </Pressable>

        <Text className="uppercase font-bold text-3xl text-center tracking-widest mb-5">
          tent name
        </Text>

        <AddImages />

        <View className="space-y-5 p-5">
          <TextInput
            className="uppercase shadow-sm rounded-xl"
            value={text}
            onChangeText={(text) => setText(text)}
            placeholder="Name your Tent place"
            selectionColor="#2943A1"
          />
          <TextInput
            className="uppercase shadow-sm rounded-xl"
            value={description}
            onChangeText={(description) => setDescription(description)}
            placeholder="Describe place"
            selectionColor="#2943A1"
          />

          <View className="flex-row items-center justify-center p-5">
            <Slider
              maximumValue={20}
              minimumValue={1}
              step={1}
              thumbTintColor="#2943A1"
              minimumTrackTintColor="#2943A1"
              value={sliderValue}
              onValueChange={(sliderValue) => setSliderValue(sliderValue)}
              style={{ width: "95%" }}
            />
            <Text className="font-bold tracking-widest color-violetblue">
              {sliderValue}
            </Text>
          </View>

          <RatingBar />

          <Pressable
            className="flex flex-row justify-center items-center space-x-2 bg-violetblue rounded-xl p-3 shadow-xl"
            onPress={submitAddingTent}
          >
            <MaterialIcons name="add-location" size={24} color="white" />
            <Text className="text-xl uppercase text-white">Add Tent</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AddTentModal;
