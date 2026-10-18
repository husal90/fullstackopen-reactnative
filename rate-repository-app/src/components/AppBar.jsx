import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client/react';

import Text from './Text';
import useAuthStorage from '../hooks/useAuthStorage';
import { ME } from '../graphql/queries';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
  tabs: {
    flexDirection: 'row',
    gap: 20,
    padding: 15,
  },
});

const AppBarTab = ({ to, children }) => (
  <Link to={to}>
    <Text color="light" fontWeight="bold" fontSize="subheading">
      {children}
    </Text>
  </Link>
);

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.tabs}>
        <AppBarTab to="/">Repositories</AppBarTab>
        {data?.me ? (
          <>
            <AppBarTab to="/review">Create a review</AppBarTab>
            <AppBarTab to="/myreviews">My reviews</AppBarTab>
            <Pressable onPress={signOut}>
              <Text color="light" fontWeight="bold" fontSize="subheading">
                Sign out
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <AppBarTab to="/signin">Sign in</AppBarTab>
            <AppBarTab to="/signup">Sign up</AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
