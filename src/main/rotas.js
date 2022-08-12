import React from "react"

import Login from "../views/login"
import CadastroUsuario from "../views/CadastroUsuario"
import Home from '../views/home'

import { Route, Switch, BrowserRouter } from 'react-router-dom'

function Rotas(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/cadastro-usuario" component={CadastroUsuario} />
            </Switch>
        </BrowserRouter> 
    )

}

export default Rotas