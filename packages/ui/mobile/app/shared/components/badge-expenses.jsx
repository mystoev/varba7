import {useQuery} from '@apollo/client';
import {Pressable, Text, View} from 'react-native';

import {useSharedNavigation} from '../../navigation';
import {GET_BADGE_EXPENSES} from '../queries/expenses';
import {badgeStyles, headingStyles} from '../styles/text';

const Badge_Expenses = () => {
  const {loading, error, data} = useQuery(GET_BADGE_EXPENSES);
  const {navigate} = useSharedNavigation();

  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <Pressable
      onPress={() => {
        navigate('expenses');
      }}>
      <View style={[badgeStyles.container, {backgroundColor: 'royalblue'}]}>
        <Text style={headingStyles.h1}>Expenses</Text>
        {loading ? (
          <Text style={headingStyles.loading}>Loading...</Text>
        ) : (
          <>
            <Text style={headingStyles.h2}>
              This Month:{' '}
              <Text style={headingStyles.white}>
                {data?.badgeExpenses.month.toLocaleString()}лв
              </Text>
            </Text>
            <Text style={headingStyles.h2}>
              This Year:{' '}
              <Text style={headingStyles.white}>
                {data?.badgeExpenses.year.toLocaleString()}лв
              </Text>
            </Text>
            <Text style={headingStyles.h4}>
              Last entry:{' '}
              <Text style={headingStyles.white}>
                {data?.badgeExpenses.lastEntry}
              </Text>
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
};

export default Badge_Expenses;
