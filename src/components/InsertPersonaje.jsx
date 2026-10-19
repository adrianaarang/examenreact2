import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import PersonajeService from '../services/PersonajeService';
import SerieService from '../services/SerieService';

export default class InsertPersonaje extends Component {
    service = new PersonajeService();
    serieService = new SerieService();

    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    selectSerie = React.createRef();

    state = {
        series: [],
        mensaje: null,
        status: false,
        idSerie: null
    }

    componentDidMount = () => {
        this.serieService.getSeries().then((response) => {
            this.setState({ series: response.data })
        })
    }

    insertPersonaje = (event) => {
        event.preventDefault();
        //EL ID DA IGUAL, LO GENERA LA API, PERO HAY QUE MANDARLO
        let idSerie = parseInt(this.selectSerie.current.value);
        let personaje = {
            idPersonaje: 0,
            nombre: this.cajaNombre.current.value,
            imagen: this.cajaImagen.current.value,
            idSerie: idSerie
        }
        this.service.insertPersonaje(personaje)
            .then(() => {
                this.setState({
                    status: true,
                    idSerie: idSerie
                })
            }).catch((error) => {
                this.setState({
                    mensaje: error.message
                })
            })
    }

    render() {
        if (this.state.status == true) {
            return (<Navigate to={"/serie/" + this.state.idSerie} />)
        }

        return (
            <div className="max-w-xl mx-auto mt-6">
                <h1 className="text-4xl text-blue-700 mb-4">Nuevo personaje</h1>
                {
                    this.state.mensaje &&
                    (<div className="bg-red-100 text-red-700 border border-red-300 rounded p-3 mb-4">
                        {this.state.mensaje}
                    </div>)
                }
                <form onSubmit={this.insertPersonaje}>
                    <label className="block mb-1">Nombre:</label>
                    <input type="text" ref={this.cajaNombre} required
                        className="w-full border rounded px-3 py-2 mb-4" />

                    <label className="block mb-1">Imagen:</label>
                    <input type="text" ref={this.cajaImagen} required
                        placeholder="URL de la imagen"
                        className="w-full border rounded px-3 py-2 mb-4" />

                    <label className="block mb-1">Serie:</label>
                    <select ref={this.selectSerie}
                        className="w-full border rounded px-3 py-2 mb-4">
                        {
                            this.state.series.map((serie, index) => {
                                return (
                                    <option key={index} value={serie.idSerie}>
                                        {serie.nombre}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                        Insertar personaje
                    </button>
                </form>
            </div>
        )
    }
}