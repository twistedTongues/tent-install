import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import ImagesList from "./ImagesList";
import { useState } from "react";

const AddImages = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex justify-center items-center">
      {image && (
        <Image source={{ uri: image }} className="h-64 w-64 rounded-lg" />
      )}
      {!image && (
        <TouchableOpacity
          onPress={pickImages}
          className="flex flex-row items-center justify-center bg-violetblue p-2 rounded-xl opacity-80 shadow-lg"
        >
          <MaterialIcons name="add-photo-alternate" size={24} color="white" />
          <Text className="text-white font-bold">Choose a photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddImages;
