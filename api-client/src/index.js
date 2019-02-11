import React, {Component} from 'react';
import api from './services/api'; 

import { 
  StyleSheet, 
  View, 
  Button,
  Text,
  AsyncStorage,
  Alert
} from 'react-native';

export default class App extends Component {
  
  state = {
    loggedInUser: null,
    errorMessage: '',
    users: [],
  };

  signIn = async () => {
    try {
      const response = await api.post('/login', {
        email: 'barbaragordon@gmail.com',
        password: '123',
      });
      
      // o primeiro atributo 'data' e referente ao APISAUCE, o Segundo atributo 'data' vem da resposta da requisição da API.
      const { token, user } = response.data.data;
     
      await AsyncStorage.multiSet([
        ['@GolangApi:token', token],
        ['@GolangApi:user', JSON.stringify(user)],
      ]);

      this.setState({ loggedInUser: user })

      Alert.alert('Logado com sucesso! :)');
    } catch (err) {
      this.setState({ errorMessage: err.data.message });
    }
  
  };

  // método executado todas as vezes que o componente e renderizado
  async componentDidMount() { 
    const token = await AsyncStorage.getItem('@GolangApi:token');
    const user = JSON.parse(await AsyncStorage.getItem('@GolangApi:user'));

    if(token && user) {
      this.setState({ loggedInUser: user });
    }
  }


  getUserList = async () => {
    try {

      const response = await api.get('/users'); 
  
      this.setState({ users: response.data.data });
     
    } catch(err) {

      message = err.data.message ? err.data.message: err.data; 
      this.setState({ errorMessage: message });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        { !!this.state.loggedInUser && <Text style={styles.loginMessage}>{this.state.loggedInUser.nickname}</Text> }
        { !!this.state.errorMessage && <Text style={styles.errorMessage}>{this.state.errorMessage}</Text> }
        { this.state.loggedInUser?  <Button onPress={this.getUserList} title="Load users" /> :  
          <Button onPress={this.signIn} title="Entrar" /> }

        { this.state.users.filter(user => user._id != this.state.loggedInUser._id).map(user => (
          <View key={user._id} style={styles.listView}>
            <Text>{user.nickname}</Text>
          </View>
        )) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loginMessage: {
    padding: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorMessage: {
    padding: 20,
    fontSize: 15,
    color: 'red',
  },
  listView: {
    marginTop: 15,
  }
});
