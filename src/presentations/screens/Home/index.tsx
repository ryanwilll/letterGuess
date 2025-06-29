import GameFinished from '@components/GameFinished';
import Keyboard from '@components/Keyboard';
import { colors } from '@utils/colors';
import { APAGAR, ENTER } from '@utils/keys';
import { DBWords } from '@utils/words';
import { Fragment, useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { styles } from './styles';

export enum EGameState {
  'PLAYING' = 'playing',
  'WIN' = 'win',
  'LOSE' = 'lose',
}

const NUMBER_OF_TRIES = 6;

export default function Home() {
  const [word, setWord] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [letters, setLetters] = useState<string[]>([]);

  const [rows, setRows] = useState(new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill('')));
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentColumn, setCurrentColumn] = useState<number>(0);
  const [gameState, setGameState] = useState<EGameState>(EGameState.PLAYING);
  const [time, setTime] = useState<number>(0);
  const [keyboardKey, setKeyboardKey] = useState<number>(0);

  const onKeyPressed = (key: string) => {
    if (gameState !== 'playing') return;

    const copy = [...rows.map((row) => [...row])];

    switch (key) {
      case APAGAR:
        const prevCol = currentColumn - 1;

        if (prevCol >= 0) {
          copy[currentRow][prevCol] = '';
          setRows(copy);
          setCurrentColumn(prevCol);
        }
        break;

      case ENTER:
        if (currentColumn === letters?.length) {
          setCurrentColumn(0);
          setCurrentRow((prev) => prev + 1);
        }
        break;
      default:
        if (currentColumn < letters?.length) {
          copy[currentRow][currentColumn] = key;
          setRows(copy);
          setCurrentColumn((prev) => prev + 1);
        }
        break;
    }
  };

  const isCellActive = (row: number, col: number) => {
    return row === currentRow && currentColumn === col;
  };

  const getCellBGColor = (row: number, col: number) => {
    const letter = rows[row][col];

    if (row >= currentRow) {
      return colors.black;
    }

    if (letter === letters[col]) {
      return colors.primary;
    }

    if (letters.includes(letter)) {
      return colors.secondary;
    }

    return colors.darkgray;
  };

  const getAllLettersColors = (color: string) => {
    return rows.flatMap((row, indexRow) =>
      row.filter((col: string, indexCol: number) => getCellBGColor(indexRow, indexCol) === color)
    );
  };

  const greenCaps = getAllLettersColors(colors.primary);
  const yellowCaps = getAllLettersColors(colors.secondary);
  const grayCaps = getAllLettersColors(colors.darkgray);

  const checkGameState = () => {
    if (checkIfWon()) {
      setGameState(EGameState.WIN);
      return;
    } else if (checkIfLose()) {
      setGameState(EGameState.LOSE);
    }
  };

  const checkIfWon = () => {
    const wordInserted = rows[currentRow - 1]?.join('');
    return wordInserted === word?.toLowerCase();
  };

  const checkIfLose = () => {
    return currentRow === rows?.length;
  };

  function getRandomElement<T>(array: T[]): T | null {
    if (!array || array.length === 0) return null;
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  const getWord = () => {
    if (DBWords.length > 0) {
      const categoriaSelecionada = getRandomElement(DBWords);

      if (categoriaSelecionada && categoriaSelecionada.words.length > 0) {
        setCategory(categoriaSelecionada.category);

        const palavraSelecionada = getRandomElement(categoriaSelecionada.words);

        if (palavraSelecionada) {
          setWord(palavraSelecionada);
          setLetters(palavraSelecionada.split(''));
        }
      }
    }
  };

  const onPressPlayAgain = () => {
    setKeyboardKey((prev) => (prev ? 0 : 1));
    setGameState(EGameState.PLAYING);
    setCurrentRow(0);
    setCurrentColumn(0);
    setTime(0);
    getWord();
  };

  useEffect(() => {
    if (currentRow > 0) {
      checkGameState();
    }
  }, [currentRow]);

  useEffect(() => {
    if (letters.length > 0) {
      const initialRows = Array.from({ length: NUMBER_OF_TRIES }, () =>
        Array.from({ length: letters.length }, () => '')
      );
      setRows(initialRows);
    }
  }, [letters]);

  useEffect(() => {
    getWord();
  }, []);

  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const endTime = Date.now();
      const timeSpentInSeconds = Math.floor((endTime - startTime) / 1000);
      setTime(timeSpentInSeconds);

      const formattedTime =
        timeSpentInSeconds < 60
          ? `${timeSpentInSeconds} segundo${timeSpentInSeconds !== 1 ? 's' : ''}`
          : `${Math.floor(timeSpentInSeconds / 60)} minuto${Math.floor(timeSpentInSeconds / 60) !== 1 ? 's' : ''} e ${
              timeSpentInSeconds % 60
            } segundo${timeSpentInSeconds % 60 !== 1 ? 's' : ''}`;

      console.log(`Usuário ficou na tela por ${formattedTime}`);
    };
  }, [gameState]);

  if (gameState === EGameState.PLAYING && letters.length === 0) {
    return <Text style={styles.title}>Carregando...</Text>;
  }

  return (
    <Fragment>
      {gameState === EGameState.PLAYING ? (
        <>
          <Text style={styles.title}>LetterGuess</Text>
          <Text style={styles.category}>Categoria: {category}</Text>

          <View style={styles.map}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 32 }}>
              {rows.map((row: string[], indexRow: number) => (
                <View style={styles.row} key={`row-${indexRow}`}>
                  {row?.map((letter: string, indexCol: number) => (
                    <View
                      style={[
                        styles.cell,
                        {
                          borderColor: isCellActive(indexRow, indexCol) ? colors.lightgray : colors.darkgray,
                          backgroundColor: getCellBGColor(indexRow, indexCol),
                        },
                      ]}
                      key={`cell-${indexRow}-${indexCol}`}
                    >
                      <Text style={styles.cellText}>{letter?.toUpperCase()}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>

          <Keyboard
            key={`keyboard-${keyboardKey}`}
            grayCaps={grayCaps}
            greenCaps={greenCaps}
            onKeyPressed={onKeyPressed}
            yellowCaps={yellowCaps}
          />
        </>
      ) : (
        <GameFinished
          gameState={gameState}
          word={word}
          numberTries={currentRow}
          numberMaxTries={NUMBER_OF_TRIES}
          time={time}
          onPressPlayAgain={onPressPlayAgain}
        />
      )}
    </Fragment>
  );
}
