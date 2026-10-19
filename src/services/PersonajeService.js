import axios from 'axios';
import Global from '../Global';

export default class PersonajeService {
    async getPersonajes() {
        const response = await axios.get(Global.urlApi + "api/Personajes");
        return response;
    }

    async findPersonaje(idPersonaje) {
        const response = await axios.get(Global.urlApi + "api/Personajes/" + idPersonaje);
        return response;
    }

    async getPersonajesPorSerie(idSerie) {
        const response = await axios.get(Global.urlApi + "api/Series/PersonajesSerie/" + idSerie);
        return response;
    }

    async insertPersonaje(personaje) {
        const response = await axios.post(Global.urlApi + "api/Personajes", personaje);
        return response;
    }

    async updatePersonajeSerie(idPersonaje, idSerie) {
        const response = await axios.put(Global.urlApi + "api/Personajes/" + idPersonaje + "/" + idSerie);
        return response;
    }
}