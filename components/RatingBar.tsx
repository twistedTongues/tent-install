import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

const RatingBar = () => {
  const starRatingOptions = [1, 2, 3, 4, 5];
  const [starRating, setStarRating] = useState(0);

  return (
    <View className="flex-row justify-center">
      {starRatingOptions.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => setStarRating(option)}
        >
          <MaterialIcons
            name={starRating >= option ? "star" : "star-border"}
            size={52}
            style={starRating >= option
              ? { color: "#ffb300" }
              : { color: "#aaa" }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RatingBar;
