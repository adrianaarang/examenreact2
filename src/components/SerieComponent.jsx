import React, { Component } from 'react'
import SerieService from '../services/SerieService'; 
import PersonajesService from '../services/PersonajeService';


export default class SerieComponent extends Component {

    SerieService = new SerieService(); 
    PersonajesService = new PersonajesService(); 

    state={
        serie: null,
        personajes: [],
        verPersonajes: false,
        status: false
    }

    loadSerie = () => {
           this.SerieService.findSerie(this.props.idSerie).then((response)=> {
            this.setState({
                serie: response.data,
                verPersonajes: false,
                status: true
            })
        })
 
    }

    loadPersonajes = () => {
        this.PersonajesService.getPersonajesPorSerie(this.props.idSerie).then((response)=> {
            this.setState({
                personajes: response.data,
                verPersonajes: true
            })
        })
    }
    volver = () => {
        this.setState({
            verPersonajes: false
        })
    }
    componentDidMount = () => {
        this.loadSerie();

    }
      componentDidUpdate = (oldProps) => {
        if (oldProps.idSerie != this.props.idSerie) {
            this.loadSerie();
        
        }
    }

    render() {
  
        if (this.state.status == false) {
            return <p className="text-center mt-10 text-gray-500">Cargando...</p>
        }

   
        if (this.state.verPersonajes == true) {
            return (
                <div className="max-w-3xl mx-auto mt-6">
                    <button onClick={this.volver}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mb-2">
                        Volver
                    </button>
                    <table className="w-full bg-gray-900 text-white">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="text-left p-3">Personaje</th>
                                <th className="text-left p-3">Imagen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.personajes.map((personaje, index) => {
                                    return (
                                        <tr key={index} className="border-b border-gray-700">
                                            <td className="p-3 align-top">{personaje.nombre}</td>
                                            <td className="p-3">
                                                <img src={personaje.imagen} alt={personaje.nombre} className="w-36" />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        }

  
        return (
            <div className="max-w-md mx-auto mt-6 border rounded overflow-hidden shadow">
                <img src={this.state.serie.imagen} alt={this.state.serie.nombre} className="w-full" />
                <div className="p-5">
                    <h2 className="text-xl font-semibold">{this.state.serie.nombre}</h2>
                    <p className="mt-4">IMDB: {this.state.serie.puntuacion}</p>
                </div>
                <button onClick={this.loadPersonajes}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2">
                    Personajes
                </button>
            </div>
        )
    }
    

    }