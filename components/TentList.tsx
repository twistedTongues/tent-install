import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import client from "../sanity/lib/client";
import { Tent } from "../typings";
import TentCard from "./TentCard";

const TentList = () => {
  const [tents, setTents] = useState<Tent[]>([]);
  const query = `*[_type == "tent"]`;

  useEffect(() => {
    client.fetch(query).then((data) => {
      setTents(data);
    });
  }, []);

  return (
    <FlatList
      className="w-screen"
      data={tents}
      renderItem={({ item }) => <TentCard tent={item} />}
      keyExtractor={(item) => item._id}
      snapToAlignment="center"
      pagingEnabled
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      disableIntervalMomentum
    />
  );
};

export default TentList;
