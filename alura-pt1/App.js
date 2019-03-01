import React, {Component} from 'react';
import { 
  StyleSheet,
  FlatList
} from 'react-native';

import Post from './src/components/Post'

export default class App extends Component {

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

    render() {
        return (
            <FlatList  style={styles.container}
                keyExtractor={item => String(item.id)}
                data={this.state.photos}
                renderItem={ ({item}) => <Post photo={item} /> }
            />
        );
    }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});