import {useNavigation} from '@react-navigation/native';

export const useSharedNavigation = () => {
  const {navigate} = useNavigation();

  return {
    navigate: pageName => navigate(pageName),
  };
};
