import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';

// Pega as dimensões da tela
const width = Dimensions.get('screen').width;

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photo: {
              ...this.props.photo, 
              likers: []},
              comment: ''
        };
    }

    loadIcon(liked) { 
        if (liked) {            
            return require('../../resources/img/s2-checked.png');
        }
        return require('../../resources/img/s2.png');
    }

    like() {
        const photo = this.state.photo;
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
        this.setState({photo: photoUpdated});
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

    addComment() {
        const comment = this.state.comment;
        if(comment === '') return;
        const newComments = [...this.state.photo.comentarios, {
          id: this.state.photo.comentarios.length,
          login: 'MyUser',
          texto: comment
        }];
        const photoUpdated = {
          ...this.state.photo,
          comentarios: newComments
        };
        this.setState({photo: photoUpdated, comment: ''});
        this.inputComment.clear();
    }

    render() {

        const photo = this.state.photo;

        return (
            <View>
                <View style={styles.header}>
                    <Image source={require('../../resources/img/3.png')} style={styles.avatar} />
                    <Text style={styles.username}>{photo.loginUsuario}</Text>
                </View>
                <Image source={{uri: 'https://i.ibb.co/jGgBppJ/Scenery-in-Plateau-by-Arto-Marttinen.jpg'}} style={styles.imagePost}/>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.like.bind(this)}>
                        <Image 
                            source={this.loadIcon(photo.likeada)} 
                            style={styles.btnLike} />
                    </TouchableOpacity>
                    { this.showLikes(photo.likers) }
                    { this.showSubtitles(photo) }

                    {photo.comentarios.map(comment => 
                      <View key={comment.id} style={styles.comment}>
                          <Text style={styles.commentTitle}>{comment.login}</Text>
                          <Text>{comment.texto}</Text> 
                      </View> 
                    )}

                    <View style={styles.newComment}>
                        <TextInput style={styles.input} 
                            placeholder="Faça um comentário" 
                            ref={input => this.inputComment = input}
                            onChangeText={text => this.setState({comment: text})}/>

                        <TouchableOpacity onPress={this.addComment.bind(this)}>
                            <Image style={styles.icon}
                                source={require('../../resources/img/send.png')} />
                        </TouchableOpacity>
                    </View>
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
  btnLike: {
    marginBottom: 10,
    height: 40,
    width: 40,
  },
  like: {
    fontWeight: 'bold'
  },
  comment: {
    flexDirection: 'row'
  },
  commentTitle: {
    fontWeight: 'bold',
    marginRight: 5
  },
  newComment: {
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
  }, 
  footer: {
    margin: 10,
  }
});