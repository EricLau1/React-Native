import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  Dimensions
} from 'react-native';
import InputCommnet from './InputComment';
import Likes from './Likes';

// Pega as dimensões da tela
const width = Dimensions.get('screen').width;

export default class Post extends Component {

    showSubtitles(photo) {
      if (photo.comentario != "") {
        return (
          <View style={styles.comment}>
            <Text style={styles.commentTitle}>{photo.loginUsuario}</Text>
            <Text>{ photo.comentario }</Text>
          </View>
        );
      }
      return <Text>adicione uma legenda</Text>
    }

    render() {

        const { photo, likeCallback, commentCallback } = this.props;
       
        return (
            <View>

                <View style={styles.header}>

                    <Image source={require('../../resources/img/3.png')} style={styles.avatar} />
                    <Text style={styles.username}>{photo.loginUsuario}</Text>

                </View>

                <Image source={{uri: 'https://i.ibb.co/jGgBppJ/Scenery-in-Plateau-by-Arto-Marttinen.jpg'}} style={styles.imagePost}/>
                
                <View style={styles.footer}>
                    
                    <Likes photo={photo} likeCallback={likeCallback} />

                    { this.showSubtitles(photo) }

                    {photo.comentarios.map(comment => 
                      <View key={comment.id} style={styles.comment}>
                          <Text style={styles.commentTitle}>{comment.login}</Text>
                          <Text>{comment.texto}</Text> 
                      </View> 
                    )}

                    <InputCommnet photoId={photo.id} commentCallback={commentCallback} />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  header: {
    margin:10, 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  avatar: { 
    marginRight:10, 
    borderRadius: 20, 
    width: 40, 
    height: 40 
  },
  username: {
    fontWeight: 'bold',
    fontSize: 18
  },
  imagePost: {
    width: width, 
    height: width
  },
  comment: {
    flexDirection: 'row'
  },
  commentTitle: {
    fontWeight: 'bold',
    marginRight: 5
  }, 
  footer: {
    margin: 10,
  }
});