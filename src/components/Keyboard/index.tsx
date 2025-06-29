import { View, Text, TouchableOpacity } from 'react-native';
import styles, { keyWidth } from './styles';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { APAGAR, ENTER, keys } from '@utils/keys';
import { colors } from '@utils/colors';

type Props = {
  onKeyPressed: (key: string) => void;
  greenCaps: string[];
  yellowCaps: string[];
  grayCaps: string[];
};

const Keyboard = (props: Props) => {
  const { onKeyPressed = () => {}, greenCaps = [], yellowCaps = [], grayCaps = [] } = props;

  const isLongButton = (key: string) => {
    return key === ENTER || key === APAGAR;
  };

  const getKeyBGColor = (key: string) => {
    if (greenCaps.includes(key)) {
      return colors.primary;
    }
    if (yellowCaps.includes(key)) {
      return colors.secondary;
    }
    if (grayCaps.includes(key)) {
      return colors.darkgray;
    }
    return colors.gray;
  };

  return (
    <Animated.View entering={SlideInDown.springify().mass(0.5)} style={styles.keyboard}>
      {keys.map((keyRow, i) => (
        <View style={styles.row} key={`row-${i}`}>
          {keyRow.map((key: string) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onKeyPressed(key)}
              disabled={grayCaps.includes(key)}
              key={key}
              style={[
                styles.key,
                isLongButton(key) ? { width: keyWidth * 1.4 } : {},
                { backgroundColor: getKeyBGColor(key) },
              ]}
            >
              <Text style={styles.keyText}>{key.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </Animated.View>
  );
};

export default Keyboard;
