import { AsyncStorage } from 'react-native';
import { create } from 'apisauce';

const api = create({
    baseURL: 'https://vast-dawn-60652.herokuapp.com/api'
});

// middleware que seta valores antes de fazer a requisição
api.addAsyncRequestTransform(request => async () => {
    const token = await AsyncStorage.getItem('@GolangApi:token');
    if(token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
});

// middleware da resposta que vem da Api
api.addResponseTransform(response => {
    if (!response.ok) throw response;
});

export default api;