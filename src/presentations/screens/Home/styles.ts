import { colors } from '@utils/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    color: colors.lightgray,
    fontSize: 32,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 8,
  },
  category: {
    color: colors.lightgray,
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 4,
  },
  map: {
    alignSelf: 'stretch',
    flex: 1,
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    borderWidth: 2,
    borderColor: colors.darkgray,
    flex: 1,
    maxWidth: 70,
    aspectRatio: 1,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontWeight: 'bold',
    fontSize: 28,
    color: colors.lightgray,
  },
});
