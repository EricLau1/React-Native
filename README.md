	sudo npm install -g react-native-cli

Iniciar projeto

	react-native init hunt

Rode um emulador do Android ou plugue o celular no computador no modo depuração.

Instalando o App no Android

	react-native run-android

Executar o React-Native

	react-native start

Projeto baseado em: https://rocketseat.com.br/

Adicionado Rotas

	$ npm i --save react-navigation@2.18.3

Crie o diretório [src] na raiz do projeto.

Delete o arquico 'App.js'.

Dentro do diretório [src] crie:

	Diretório [pages]
	
	Arquivo 'routes.js'

	Arquivo index.js


Dentro do diretório [src/pages/] crie:

	Arquivo 'main.js'

Conteúdo do arquivo 'main.js':

    import React, { Component } from 'react';

    import { View, Text } from 'react-native';

    export default class Main extends Component {
        static navigationOptions = {
            title: "JSHunt",
        }
        render() {
            return (
                <View>
                    <Text>Página Main</Text>
                </View>
            );
        }
    }


Escreva o código no arquivo 'routes.js':

    import { createStackNavigator } from 'react-navigation';

    import Main from './pages/main';

    export default createStackNavigator({
        Main,
    });


Escreva o códiigo no arquivo [src/index.js]:

    import React from 'react';
    import Routes from './routes';

    const App = () => <Routes />;

    export default App;


No diretório raiz:

	conteúdo do arquivo 'index.js':


		import {AppRegistry} from 'react-native';
		import App from './src';
		import {name as appName} from './app.json';
		
		AppRegistry.registerComponent(appName, () => App);


Estilizando o Header:

No arquivo 'routes.js':

	import { createStackNavigator } from 'react-navigation';
	
	import Main from './pages/main';
	
	export default createStackNavigator({
	    Main,
	}, {
	    navigationOptions: {
	        headerStyle: {
	            backgroundColor: "#DA552F"
	        },
	        headerTitleStyle: {
	            // centralizando o Titulo no Android
	            flex: 1,
	            textAlign: 'center',
	            alignSelf: 'center' //if style using flexbox
	      },
	        headerTintColor: "#FFF" // Cor do Texto do Header
	    }
	});
	

Crie um pasta dentro do diretório [src] chamada [config].

No diretório [config] crie o arquivo 'StatusBarConfig.js'.


	Conteúdo do arquivo 'StatusBarConfig.js':

		import { StatusBar } from 'react-native';
		
		// comando para o android
		StatusBar.setBackgroundColor("#DA552F");
		
		// comando para IOs
		// deixa a cor do texto no header em branco
		StatusBar.setBarStyle("light-content");
	
	
No arquivo 'index.js' do diretório [src]:


	import React from 'react';
	import Routes from './routes';
	import './config/StatusBarConfig';
	
	const App = () => <Routes />;
	
	export default App;



Consumindo Api com React-Native

	URL: "https://rocketseat-node.herokuapp.com/api/products"

Instalar a Dependencia:

	$ npm i --save axios

Dentro do diretório [src] crie uma pasta chamada [services].

Dentro do diretório [services] crie o aquivo 'api.js'.

	Conteúdo do arquivo 'api.js':

		import axios from 'axios';
		
		const api = axios.create({
		    baseURL: 'https://rocketseat-node.herokuapp.com/api'
		});
		
		export default api;


No arquivo 'main.js' do diretório [pages]:


    import React, { Component } from 'react';
    import api from '../services/api';

    import { View, Text } from 'react-native';

    export default class Main extends Component {
        
        static navigationOptions = {
            title: "JSHunt",
        }

        // o React Renderiza novamente toda vez que a variavel em {state} é alterada
        state = {
            total: 0,
            docs: [],
        };
        
        // carrega junto com a tela
        componentDidMount() {
            this.loadProducts();
        }

        loadProducts = async () => {
            const response = await api.get('/products')
            const { docs } = response.data;

            // Abra o Menu para ver os dados no navegodor:
            // Abrir Menu => adb shell input keyevent 82
            // Abrir Navegador => Debug JS Remotely
            console.log(docs);

            // Método obrigatório para atualizar a variável {state}
            this.setState({ total: docs.length, docs });
        };

        render() {
            return (
                <View>
                    <Text>Produtos: {this.state.total}</Text>
                    {this.state.docs.map(product => (
                        <Text key={product._id}>{product.title}</Text>
                    ))}
                </View>
            );
        }
    }



Melhorando a visualização da Lista de Produtos:

Aquivo 'main.js':


    import React, { Component } from 'react';
    import api from '../services/api';

    import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

    export default class Main extends Component {
        
        static navigationOptions = {
            title: "JSHunt",
        }

        // o React Renderiza novamente toda vez que a variavel em State é alterada
        state = {
            total: 0,
            docs: [],
        };
        
        componentDidMount() {
            this.loadProducts();
        }

        loadProducts = async () => {
            const response = await api.get('/products')
            const { docs } = response.data;

            // Abra o Menu para ver os dados no navegodor:
            // Abrir Menu => adb shell input keyevent 82
            // Abrir Navegador => Debug JS Remotely
            console.log(docs);

            // Método obrigatório para atualizar o State
            this.setState({ total: docs.length, docs });
        };
        
        renderItem = ({ item }) => (
            <View style={styles.productContainer}>
                <Text style={styles.productTitle}>{ item.title }</Text>
                <Text style={styles.productDescription}>{ item.description }</Text>

                <TouchableOpacity style={styles.productButton} onPress={() => {}} >
                    <Text style={styles.productButtonText}>Acessar</Text>
                </TouchableOpacity>
            </View>
        );

        render() {
            return (
                <View style={styles.container}>
                    <FlatList 
                        contentContainerStyle={styles.list}
                        data={this.state.docs}
                        keyExtractor={item => item._id}
                        renderItem={this.renderItem} 
                    />
                </View>
            );
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fafafa'
        },
        list: {
            padding: 20
        },
        productContainer: {
            backgroundColor: '#FFF',
            borderWidth: 1,
            borderColor: '#DDD',
            borderRadius: 5,
            padding: 20,
            marginBottom: 20,
        },
        productTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333'
        },
        productDescription: {
            fontSize: 16,
            color: '#999',
            marginTop: 5,
            lineHeight: 24
        },
        productButton: {
            height: 42,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: '#DA552F',
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10 
        },
        productButtonText: {
            fontSize: 16,
            color: '#DA552F',
            fontWeight: 'bold'
        }
    });


Colocando Infinite Scroll (Carregando dados por demanda):

Arquivo 'main.js':


    import React, { Component } from 'react';
    import api from '../services/api';

    import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

    export default class Main extends Component {
        
        static navigationOptions = {
            title: "JSHunt",
        }

        // o React Renderiza novamente toda vez que a variavel em State é alterada
        state = {
            productInfo: {},
            docs: [],
            page: 1,
        };
        
        componentDidMount() {
            this.loadProducts();
        }

        loadProducts = async (page = 1) => {
            const response = await api.get(`/products?page=${page}`)
            const { docs, ...productInfo } = response.data;

            // Abra o Menu para ver os dados no navegodor:
            // Abrir Menu => adb shell input keyevent 82
            // Abrir Navegador => Debug JS Remotely
            console.log(docs);

            this.setState({ 
                // Método para concatenar Arrays
                docs: [...this.state.docs, ...docs], 
                productInfo,
                page
            });
        };
        
        renderItem = ({ item }) => (
            <View style={styles.productContainer}>
                <Text style={styles.productTitle}>{ item.title }</Text>
                <Text style={styles.productDescription}>{ item.description }</Text>

                <TouchableOpacity style={styles.productButton} onPress={() => {}} >
                    <Text style={styles.productButtonText}>Acessar</Text>
                </TouchableOpacity>
            </View>
        );

        loadMore = () => {
            const { page, productInfo } = this.state;
            if (page === productInfo.pages) return;

            const pageNumber = page + 1;
            this.loadProducts(pageNumber);
        };

        render() {
            return (
                <View style={styles.container}>
                    <FlatList 
                        contentContainerStyle={styles.list}
                        data={this.state.docs}
                        keyExtractor={item => item._id}
                        renderItem={this.renderItem}
                        onEndReached={this.loadMore} 
                        onEndReachedThreshold={0.1}
                    />
                </View>
            );
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fafafa'
        },
        list: {
            padding: 20
        },
        productContainer: {
            backgroundColor: '#FFF',
            borderWidth: 1,
            borderColor: '#DDD',
            borderRadius: 5,
            padding: 20,
            marginBottom: 20,
        },
        productTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333'
        },
        productDescription: {
            fontSize: 16,
            color: '#999',
            marginTop: 5,
            lineHeight: 24
        },
        productButton: {
            height: 42,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: '#DA552F',
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10 
        },
        productButtonText: {
            fontSize: 16,
            color: '#DA552F',
            fontWeight: 'bold'
        }
    });


Navegando para Outras Páginas e Mostrando uma Web View.

Crie o arquivo 'product.js' no diretório [pages].

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
	

Arquivo 'main.js'.

    import React, { Component } from 'react';
    import api from '../services/api';

    import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

    export default class Main extends Component {
        
        static navigationOptions = {
            title: "JSHunt",
        }

        // o React Renderiza novamente toda vez que a variavel em State é alterada
        state = {
            productInfo: {},
            docs: [],
            page: 1,
        };
        
        componentDidMount() {
            this.loadProducts();
        }

        loadProducts = async (page = 1) => {
            const response = await api.get(`/products?page=${page}`)
            const { docs, ...productInfo } = response.data;

            // Abra o Menu para ver os dados no navegodor:
            // Abrir Menu => adb shell input keyevent 82
            // Abrir Navegador => Debug JS Remotely
            console.log(docs);

            this.setState({ 
                // Método para concatenar Arrays
                docs: [...this.state.docs, ...docs], 
                productInfo,
                page
            });
        };
        
        renderItem = ({ item }) => (
            <View style={styles.productContainer}>
                <Text style={styles.productTitle}>{ item.title }</Text>
                <Text style={styles.productDescription}>{ item.description }</Text>

                <TouchableOpacity style={styles.productButton} onPress={() => {
                    this.props.navigation.navigate('Product', { product: item })
                }} >
                    <Text style={styles.productButtonText}>Acessar</Text>
                </TouchableOpacity>
            </View>
        );

        loadMore = () => {
            const { page, productInfo } = this.state;
            if (page === productInfo.pages) return;

            const pageNumber = page + 1;
            this.loadProducts(pageNumber);
        };

        render() {
            return (
                <View style={styles.container}>
                    <FlatList 
                        contentContainerStyle={styles.list}
                        data={this.state.docs}
                        keyExtractor={item => item._id}
                        renderItem={this.renderItem}
                        onEndReached={this.loadMore} 
                        onEndReachedThreshold={0.1}
                    />
                </View>
            );
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fafafa'
        },
        list: {
            padding: 20
        },
        productContainer: {
            backgroundColor: '#FFF',
            borderWidth: 1,
            borderColor: '#DDD',
            borderRadius: 5,
            padding: 20,
            marginBottom: 20,
        },
        productTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333'
        },
        productDescription: {
            fontSize: 16,
            color: '#999',
            marginTop: 5,
            lineHeight: 24
        },
        productButton: {
            height: 42,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: '#DA552F',
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10 
        },
        productButtonText: {
            fontSize: 16,
            color: '#DA552F',
            fontWeight: 'bold'
        }
    });


Arquivo 'routes.js':

    import { createStackNavigator } from 'react-navigation';

    import Main from './pages/main';
    import Product from './pages/product'

    export default createStackNavigator({
        Main,
        Product
    }, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#DA552F"
            },
            headerTintColor: "#FFF" // Cor do Texto do Header
        }
    });


















	
