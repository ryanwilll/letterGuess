import { colors } from '@utils/colors';
import LottieView from 'lottie-react-native';
import { Fragment } from 'react';
import { StyleSheet, Text, StatusBar, View, useWindowDimensions, TouchableOpacity } from 'react-native';

export type Props = {
  gameState: 'win' | 'lose';
  word: string;
  numberTries: number;
  numberMaxTries: number;
  time: number;
  onPressPlayAgain: () => void;
};

export default function GameFinished(props: Props) {
  const { width, height } = useWindowDimensions();
  const { gameState, word, numberTries, numberMaxTries, time, onPressPlayAgain } = props;

  const isWin = gameState === 'win';
  const winAnimation = '@assets/animations/happyAnimation.json';
  const loseAnimation = '@assets/animations/sadAnimation.json';

  return (
    <Fragment>
      <StatusBar barStyle='light-content' />
      {isWin && (
        <View
          pointerEvents='none'
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width,
            height,
            zIndex: 1,
          }}
        >
          <LottieView
            autoPlay
            loop={false}
            enableSafeModeAndroid
            source={require('@assets/animations/confettiAnimation.json')}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      )}
      <View style={styles.container}>
        <View style={styles.containerInfos}>
          <Text style={styles.title}>Você {isWin ? 'venceu!' : 'perdeu...'}</Text>
          <LottieView
            autoPlay
            style={{
              width: 64,
              height: 64,
            }}
            loop={false}
            source={isWin ? require(winAnimation) : require(loseAnimation)}
          />
          <Text style={styles.wordText}>
            A palavra era: <Text style={styles.word}>{word}</Text>
          </Text>
          <Text style={styles.info}>
            Você usou <Text style={styles.word}>{numberTries}</Text> de{' '}
            <Text style={styles.word}>{numberMaxTries}</Text> tentativas e gastou{' '}
            <Text style={styles.word}>{time}</Text> segundos
          </Text>
        </View>
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={onPressPlayAgain}>
          <Text style={styles.buttonText}>Jogar novamente!</Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    gap: 32,
  },
  containerInfos: {
    gap: 32,
    alignItems: 'center',
  },
  title: {
    color: colors.lightgray,
    fontSize: 32,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 8,
  },
  wordText: {
    color: colors.lightgray,
    fontSize: 18,
  },
  word: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  info: {
    color: colors.lightgray,
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.darkgray,
    paddingVertical: 24,
    paddingHorizontal: 64,
    borderRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: colors.lightgray,
  },
});
