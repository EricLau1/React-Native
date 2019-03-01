import React, {Component} from 'react';
import { 
  StyleSheet,
  FlatList,
  Platform
} from 'react-native';

import Post from './Post';

export default class Feed extends Component {

    constructor() {
      super();
      this.state = {
        photos: []
      };
    }

    componentDidMount() {
      fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
        .then(response => response.json())
        .then(data => this.setState({photos: data}))
    }


    like(photoId) {
      const photo = this.state.photos.find(photo => photo.id === photoId);
      newLikers = [];
      if(!photo.likeada) {
          newLikers = [
            ...photo.likers,
            {login: 'MyUser'}
          ];
      } else {
        newLikers = photo.likers.filter(liker => {
          return liker.login !== 'MyUser'
        });
      }
      const photoUpdated = {
          ...photo,
          likeada: !photo.likeada,
          likers: newLikers
      };

      const photos = this.state.photos.map(photo => photo.id === photoUpdated.id ? photoUpdated: photo);

      this.setState({photos: photos});
  }

  addComment(photoId, comment, inputComment) {
      if(comment === '') return;

      const photo = this.state.photos.find(photo => photo.id === photoId)

      const newComments = [...photo.comentarios, {
        id: photo.comentarios.length,
        login: 'MyUser',
        texto: comment
      }];
      const photoUpdated = {
        ...photo,
        comentarios: newComments
      };

      const photos = this.state.photos.map(photo => photo.id === photoUpdated.id? photoUpdated : photo);
      this.setState({photos: photos});
      inputComment.clear();
  }

    render() {
        return (
            <FlatList  style={styles.container}
                keyExtractor={item => String(item.id)}
                data={this.state.photos}
                renderItem={ ({item}) => 
                  <Post photo={item} likeCallback={this.like.bind(this)} 
                  commentCallback={this.addComment.bind(this)} /> }
            />
        );
    }
}

const margemIOS = Platform.OS == 'ios'? 20 : 0;

const styles = StyleSheet.create({
  container: {
    marginTop: margemIOS,
  },
});