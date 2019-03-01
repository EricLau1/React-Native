import React, {Component} from 'react';
import { 
  StyleSheet, 
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';


export default class InputCommnet extends Component {

    constructor(){
        super();
        this.state = {
            comment: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput style={styles.input} 
                    placeholder="Faça um comentário" 
                    ref={input => this.inputComment = input}
                    onChangeText={text => this.setState({comment: text})}
                    underlineColorAndroid="transparent"/>

                <TouchableOpacity 
                onPress={ () => {
                    this.props.commentCallback(this.props.photoId, this.state.comment, this.inputComment);
                    this.setState({comment: ''});
                }}>
                    
                    <Image style={styles.icon}
                        source={require('../../resources/img/send.png')} />

                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
      },
      input: {
        flex: 1,
        height: 40
      },
      icon: {
        width: 30,
        height: 30
      }
});