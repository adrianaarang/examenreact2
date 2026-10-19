
import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import HomeComponent from './HomeComponent'
import SerieComponent from './SerieComponent'
import InsertPersonaje from './InsertPersonaje'
import UpdatePersonaje from './UpdatePersonaje'



function SerieElement(){
    let { idSerie } = useParams();
    return <SerieComponent idSerie={idSerie}/>

}

export default class Router extends Component  {
render() {
        return (
            <BrowserRouter>
                <MenuComponent />
                <Routes>
                    <Route path="/" element={<HomeComponent />} />
                    <Route path="/serie/:idSerie" element={<SerieElement />} />
                    <Route path="/create" element={<InsertPersonaje />} />
                    <Route path="/update" element={<UpdatePersonaje />} />
                </Routes>
            </BrowserRouter>
        )
    }


}