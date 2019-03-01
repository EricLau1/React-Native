import React, {Component} from 'react';
import { 
    StyleSheet,
    TextInput, 
    View,
    Text,
    Button,
    Dimensions,
    AsyncStorage
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Login extends Component {
    
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            message: ''
        };
    }

    signIn() {

        const uri = 'https://instalura-api.herokuapp.com/api/public/login'

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.username,
                senha: this.state.password
            }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        fetch(uri, requestInfo)
            .then(res => {
                if(res.ok) return res.text();

                throw new Error("Não foi possível efetuar o login.")
            })
            .then(token => {
                AsyncStorage.setItem('token', token);
                AsyncStorage.setItem('username', this.state.username);

            })
            .catch(e => this.setState({message: e.message}));
    }

    render() {
        const message = this.state.message;
        return (
            <View style={styles.container}>
                <Text style={styles.titleForm}>Login</Text>
                <View style={styles.form}>
                    <TextInput style={styles.input}
                        placeholder="Nome de usuário..." 
                        onChangeText={text => this.setState({username: text})}
                        autoCapitalize="none" />

                    <TextInput style={styles.input}
                        placeholder="Entre com sua senha..."
                        onChangeText={text => this.setState({password: text})}
                        secureTextEntry={true} />

                    <Button style={styles.button} title="Entrar" 
                        onPress={this.signIn.bind(this)} />
                </View>
                <Text style={styles.message}>
                    {this.state.message}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleForm: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15
    },
    form: {
        width: width * 0.8
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    button: {
        width: width * 0.5
    },
    message: {
        marginTop: 15,
        color: '#e74c3c'
    }
});