/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Animated,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Alert} from 'react-native';

const Form = ({checkConnection, Search, setSearch, setFetching}) => {
  const [btnAnimated] = useState(new Animated.Value(1));

  const pressIn = () => {
    Animated.spring(btnAnimated, {
      toValue: 0.75,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(btnAnimated, {
      toValue: 1,
      friction: 4,
      tension: 30,
    }).start();
  };

  const styleAnimate = {
    transform: [{scale: btnAnimated}],
  };

  const fetchAPI = () => {
    checkConnection();
    if (!Search.city.trim() || !Search.country.trim()) {
      Alert.alert('Error', 'Porfavor escoje una Ciudad y un Pais', [
        {text: 'Entendido'},
      ]);
      return;
    }
    setFetching(true);
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Ciudad"
          placeholderTextColor="#666"
          onChangeText={(city) => setSearch({...Search, city})}
          value={Search.city}
        />
      </View>
      <View>
        <Picker
          itemStyle={{
            height: 120,
            backgroundColor: '#fff',
          }}
          style={{
            height: Platform.OS === 'ios' ? 120 : 50,
            backgroundColor: '#fff',
          }}
          onValueChange={(country) => setSearch({...Search, country})}
          selectedValue={Search.country}>
          <Picker.Item label="-- Selecciona un Pais --" value="" />
          <Picker.Item label="Mexico" value="MX" />
          <Picker.Item label="España" value="ES" />
          <Picker.Item label="Estados Unidos" value="US" />
          <Picker.Item label="Argentina" value="AR" />
          <Picker.Item label="Colombia" value="CO" />
          <Picker.Item label="Costa Rica" value="CR" />
          <Picker.Item label="Peru" value="PE" />
        </Picker>
      </View>
      <TouchableWithoutFeedback
        onPress={() => fetchAPI()}
        onPressIn={() => pressIn()}
        onPressOut={() => pressOut()}>
        <Animated.View style={[styles.btnSearch, styleAnimate]}>
          <Text style={styles.txtSearch}>Consultar</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#fff',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnSearch: {
    marginTop: 50,
    padding: 10,
    backgroundColor: '#2ecc71',
    borderRadius: 19,
  },
  txtSearch: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Form;
