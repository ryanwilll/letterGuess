import { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from 'presentations/screens/Home';
import { colors } from '@utils/colors';

export default function App() {
  return (
    <Fragment>
      <StatusBar barStyle='light-content' />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.black, alignItems: 'center', paddingVertical: 32 }}
        edges={['top', 'left', 'right', 'bottom']}
      >
        <Home />
      </SafeAreaView>
    </Fragment>
  );
}
