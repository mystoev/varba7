import {useNavigation} from '@react-navigation/native';

export const useGoTo = () => {
  const {navigate} = useNavigation();

  return {
    navigate: pageName => navigate(pageName),
  };
};
