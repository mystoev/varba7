import {Platform, StyleSheet} from 'react-native';

export const headingStyles = StyleSheet.create({
  loading: {
    textAlign: 'center',
    padding: 10,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    paddingTop: 10,
  },
  h2: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    fontSize: 24,
    color: '#d3d3d3',
  },
  h4: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#d3d3d3',
    padding: 5,
  },
  white: {
    color: 'white',
  },
});

export const badgeStyles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: 'grey',
    width: Platform.OS === 'web' ? 480 : '90%',
    alignSelf: 'center',
    margin: 'auto',
    borderRadius: 5,
  },
});
