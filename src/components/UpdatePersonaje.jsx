import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import SerieService from '../services/SerieService';
import PersonajeService from '../services/PersonajeService';

export default class UpdatePersonaje extends Component {
    personajeService = new PersonajeService();
    serieService = new SerieService();

    selectSerie = React.createRef();
    selectPersonaje = React.createRef();

    state = {
        series: [],
        personajes: [],
        personaje: null,
        serie: null,
        status: false,
        idSerie: null
    }

    componentDidMount = () => {
        this.serieService.getSeries().then((response) => {
            this.setState({ series: response.data });
        })
        this.personajeService.getPersonajes().then((response) => {
            this.setState({ personajes: response.data });
        })
    }

    cambiarSerie = () => {
        this.serieService.findSerie(this.selectSerie.current.value).then((response) => {
            this.setState({ serie: response.data })
        })
    }

    cambiarPersonaje = () => {
        this.personajeService.findPersonaje(this.selectPersonaje.current.value).then((response) => {
            this.setState({ personaje: response.data })
        })
    }

    updatePersonaje = (event) => {
        event.preventDefault();
        let idSerie = this.selectSerie.current.value;
        let idPersonaje = this.selectPersonaje.current.value;
        if (idSerie == "" || idPersonaje == "") return;
        this.personajeService.updatePersonajeSerie(idPersonaje, idSerie).then(() => {
            this.setState({
                status: true,
                idSerie: idSerie
            })
        })
    }

    render() {
        if (this.state.status == true) {
            return (<Navigate to={"/serie/" + this.state.idSerie} />)
        }

        let select = "mt-1 mb-4 w-full rounded-lg border border-slate-300 px-3 py-2";
        let label = "block text-sm font-medium text-slate-700";

        return (
            <main className="mx-auto max-w-lg px-4 py-8">
                <h1 className="text-4xl text-blue-700 mb-4">Personajes y series</h1>

                <form onSubmit={this.updatePersonaje}>
                    <label className={label}>Seleccione una serie:</label>
                    <select ref={this.selectSerie} onChange={this.cambiarSerie}
                        defaultValue="" className={select}>
                        <option value="" disabled>-- Serie --</option>
                        {
                            this.state.series.map((serie, index) => {
                                return (<option key={index} value={serie.idSerie}>{serie.nombre}</option>)
                            })
                        }
                    </select>

                    <label className={label}>Seleccione un personaje:</label>
                    <select ref={this.selectPersonaje} onChange={this.cambiarPersonaje}
                        defaultValue="" className={select}>
                        <option value="" disabled>-- Personaje --</option>
                        {
                            this.state.personajes.map((personaje, index) => {
                                return (<option key={index} value={personaje.idPersonaje}>{personaje.nombre}</option>)
                            })
                        }
                    </select>

                    <button className="rounded-lg bg-cyan-600 hover:bg-cyan-700 px-4 py-2 text-white">
                        Guardar cambios
                    </button>
                </form>

                {
                    this.state.serie &&
                    <div className="mt-6">
                        <h2 className="text-3xl text-red-600">{this.state.serie.nombre}</h2>
                        <img src={this.state.serie.imagen} alt={this.state.serie.nombre} className="w-64 mt-2" />
                    </div>
                }
                {
                    this.state.personaje &&
                    <div className="mt-6">
                        <h2 className="text-3xl text-blue-700">{this.state.personaje.nombre}</h2>
                        <img src={this.state.personaje.imagen} alt={this.state.personaje.nombre} className="w-64 mt-2" />
                    </div>
                }
            </main>
        )
    }
}