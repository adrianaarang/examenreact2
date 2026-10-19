//necesito: 
//Get de serie, find de serie 
import axios from 'axios';
import Global from '../Global';

export default class SerieService {
    getSeries() {
        let response = axios.get(Global.urlApi + "api/Series");
        return response;
    }

    findSerie(idSerie) {
        let response = axios.get(Global.urlApi + "api/Series/" + idSerie);
        return response;
    }

}