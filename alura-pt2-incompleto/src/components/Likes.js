import React, {Component} from 'react';
import { 
  StyleSheet, 
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';


export default class Likes extends Component {

    constructor() {
        super();
    }
    
    loadIcon(liked) { 
        if (liked) {            
            return require('../../resources/img/s2-checked.png');
        }
        return require('../../resources/img/s2.png');
    }

    showLikes(likers) {
        if (likers.length > 0) {
          return (
              <Text style={styles.like}> 
                { likers.length }
                { likers.length > 1 ? ' curtidas': ' curtida' }
              </Text>
          )
        }
        return null;
    }


    render() {
        const { photo, likeCallback } = this.props;
        return (
            <View>

                <TouchableOpacity onPress={() => {
                    likeCallback(photo.id);
                }}>

                    <Image 
                        source={this.loadIcon(photo.likeada)} 
                        style={styles.btnLike} />

                </TouchableOpacity>

                { this.showLikes(photo.likers) }

            </View>
        );
    }

}

const styles = StyleSheet.create({
    btnLike: {
        marginBottom: 10,
        height: 40,
        width: 40,
    },
    like: {
        fontWeight: 'bold'
    }
})