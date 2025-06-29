import { colors } from '@utils/colors';
import { keys } from '@utils/keys';
import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
export const keyWidth = (screenWidth - 15) / keys[0].length;
const keyHeight = keyWidth * 1.3;

export default StyleSheet.create({
  keyboard: {
    alignSelf: 'stretch',
    marginTop: 'auto',
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  key: {
    width: keyWidth - 4,
    height: keyHeight - 4,
    margin: 2,
    borderRadius: 5,
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    color: colors.lightgray,
    fontWeight: 'bold',
  },
});
