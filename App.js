import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import Title from './src/Components/Title';
import Form from './src/Components/Form'

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar/>
      <Title />
      <Form />
    </SafeAreaView>
  );
}


