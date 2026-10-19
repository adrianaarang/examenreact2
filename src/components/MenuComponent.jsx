import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import SerieService from '../services/SerieService';

export default class MenuComponent extends Component {
    serieService = new SerieService();

    state = {
        series: [],
        abierto: false
    }

    componentDidMount = () => {
        this.serieService.getSeries().then((response) => {
            this.setState({ series: response.data })
        })
    }

    toggleSeries = () => {
        this.setState({ abierto: !this.state.abierto });
    }

    cerrar = () => {
        this.setState({ abierto: false });
    }

    render() {
        return (
            <nav className="bg-sky-100 px-6 py-4 flex items-center gap-6">
                <NavLink to="/" className="text-2xl font-black">SERIES</NavLink>
                <NavLink to="/" className="text-gray-600 hover:text-black">Home</NavLink>
                <NavLink to="/create" className="text-gray-600 hover:text-black">Nuevo personaje</NavLink>
                <NavLink to="/update" className="text-gray-600 hover:text-black">Modificar personajes</NavLink>

                <div className="relative">
                    <button onClick={this.toggleSeries} className="text-gray-600 hover:text-black">
                        Series ▾
                    </button>
                    {
                        this.state.abierto &&
                        <ul className="absolute right-0 mt-2 w-60 bg-white border rounded-md shadow-lg z-10">
                            {
                                this.state.series.map((serie, index) => {
                                    return (
                                        <li key={index}>
                                            <NavLink to={"/serie/" + serie.idSerie}
                                                onClick={this.cerrar}
                                                className="block px-4 py-2 hover:bg-gray-100">
                                                {serie.nombre}
                                            </NavLink>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }
                </div>
            </nav>
        )
    }
}