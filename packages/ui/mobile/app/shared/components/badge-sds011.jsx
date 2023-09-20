import { gql, useQuery } from "@apollo/client";
import { StyleSheet, Text, View } from "react-native";

const GET_LATEST_SDS011 = gql`
  query Query {
    latestSDS011 {
      timestamp
      pm25
      pm10
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

const Badge_SDS011 = () => {
  const { loading, error, data } = useQuery(GET_LATEST_SDS011);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <View style={badgeStyles.container}>
      <Text style={badgeStyles.text}>PM2.5: {data.latestSDS011.pm25}</Text>
      <Text style={badgeStyles.text}>PM10: {data.latestSDS011.pm10}</Text>
      <Text style={badgeStyles.text}>At: {data.latestSDS011.timestamp}</Text>
    </View>
  );
};

export default Badge_SDS011;
