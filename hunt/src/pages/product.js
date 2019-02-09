import React from 'react';

import { WebView } from 'react-native';

const Product = ({ navigation }) => {
    console.log(navigation);
    return <WebView source={ { uri: navigation.state.params.product.url } } />
    //return <WebView source={ { uri: 'https://google.com.br' } } />
};

Product.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.product.title
});

export default Product;