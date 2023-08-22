import {
  Alert,
  ImageBackground,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { urlForImage } from "../sanity/lib/image";
import { Tent } from "../typings";
import client from "../sanity/lib/client";

type Props = {
  tent: Tent;
};

const TentCard = ({ tent }: Props) => {
  const [isSaveBookmark, setIsSaveBookmark] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const saveBookmark = () => {
    // complete this func
    setIsSaveBookmark(!isSaveBookmark);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Share your tent place for everyone",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          //shared with activity type of result.activityType
        } else {
          //shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const onLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      client.patch(tent._id).inc({ "likes": 1 }).commit().then((res) => {
        alert(`Like was added ${res}`);
      });
    } else {
      client.patch(tent._id).dec({ "likes": 1 }).commit().then((res) => {
        alert(`Like was removed ${res}`);
      });
    }
  };

  return (
    // <View className="w-3/4 bg-violetblue h-screen m-2 items-center justify-center">
    <ImageBackground
      source={{ uri: urlForImage({ ...tent?.mainImage }).url() }}
      className="h-screen w-screen"
    >
      <View
        className="h-screen w-screen items-center justify-center space-y-5"
        style={{ backgroundColor: "rgba(0,0,0,.7)" }}
      >
        <Text className="text-cultured font-bold tracking-widest text-3xl drop-shadow-xl">
          {tent.title}
        </Text>
        <Text className="text-cultured text-center w-3/4 text-lg">
          {tent.description}
        </Text>
        <TouchableOpacity>
          <Text className="text-cultured font-bold">show more</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="absolute top-3/4 left-0 bg-black opacity-90 rounded-full p-2 m-2 "
          onPress={saveBookmark}
        >
          <MaterialCommunityIcons
            name={isSaveBookmark ? "bookmark" : "bookmark-outline"}
            size={32}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="absolute top-3/4 right-0 bg-black opacity-90 rounded-full p-2 m-2"
          onPress={onShare}
        >
          <MaterialCommunityIcons
            name="share"
            size={32}
            color="white"
          />
        </TouchableOpacity>
        <View className="flex-row space-x-1 items-center justify-center absolute top-3/4">
          <TouchableOpacity
            className={`${isLiked ? "bg-inchworm" : "bg-black"}
opacity-90 rounded-full p-2 m-2`}
            onPress={onLike}
          >
            <AntDesign name="up" size={24} color="white" />
          </TouchableOpacity>
          <Text
            className={`${isLiked ? "text-inchworm" : "text-white"} font-bold`}
          >
            1241
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default TentCard;
