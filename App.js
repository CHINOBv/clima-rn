/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import Form from './components/Form';

const App = () => {
  const [Search, setSearch] = useState({
    city: '',
    country: '',
  });

  const [Fetching, setFetching] = useState(false);

  const checkConnection = async () => {
    try {
      let res = await NetInfo.fetch();

      if (res?.isConnected !== true) {
        Alert.alert(
          'Error de Conexion',
          'Necesitas estar Conectado a Internet Para Poder Continuar',
          ['OK.'],
        );
        console.error('Not Connected');
        return;
      }
    } catch (e) {
      console.log(e);
    }
    console.log('Connected...');
  };

  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    
  }, [Fetching])

  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: 'rgb(71,149,212)'}}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.app}>
            <View style={styles.container}>
              <Form
                checkConnection={checkConnection}
                Search={Search}
                etSearch={setSearch}
                setFetching={setFetching}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'rgb(71,149, 212)',
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: '2.5%',
  },
});

export default App;
