import { gql, useQuery } from "@apollo/client";
import { StyleSheet, Text, View } from "react-native";

const GET_LATEST_BME280 = gql`
  query Query {
    latestBME280 {
      humidity
      temperature
      timestamp
    }
  }
`;

const badgeStyles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: "red",
    width: "80%",
    alignSelf: "center",
    margin: "auto",
  },
  text: {
    textAlign: "center",
    padding: 10,
    color: "black",
  },
});

const Badge_BME280 = () => {
  const { loading, error, data } = useQuery(GET_LATEST_BME280);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <View style={badgeStyles.container}>
      <Text style={badgeStyles.text}>
        Temperatures: {data.latestBME280.temperature}
      </Text>
      <Text style={badgeStyles.text}>
        Humidity: {data.latestBME280.humidity}
      </Text>
      <Text style={badgeStyles.text}>At: {data.latestBME280.timestamp}</Text>
    </View>
  );
};

export default Badge_BME280;
