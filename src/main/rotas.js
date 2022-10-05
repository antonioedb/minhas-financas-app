import React from "react"
import Login from "../views/login"
import CadastroUsuarios from '../views/cadastroUsuarios'
import Home from '../views/home'
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos'
import CadastroLancamentos from "../views/lancamentos/cadastroLancamentos"
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
//import { AuthConsumer } from "./provedorAuthenticacao"
import AuthService from '../app/service/authService'




function RotaAutenticada({component:Component,  ...props}){
    return (
        <Route {...props} render={(componentProps) =>{

            //console.log(isUsuarioAutenticado)

            if(AuthService.isUsuarioAutenticado()){
           // if(isUsuarioAutenticado){
                return(
                    <Component {...componentProps} />
                )

            }else{
                return (
                    <Redirect to={ {pathname: '/login', state: {from: componentProps.location } } } />
                )
            }

        }} />
    )
}

function Rotas(props){
    return (
        <BrowserRouter>
            <Switch>
                
                <Route exact path="/login" component={Login} />
                <Route exact path="/cadastro-usuario" component={CadastroUsuarios} />

                <RotaAutenticada isUsuarioAutenticado={AuthService.isUsuarioAutenticado()} exact path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={AuthService.isUsuarioAutenticado()} exact path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={AuthService.isUsuarioAutenticado()} exact path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
            </Switch>
        </BrowserRouter> 
    )

}

export default Rotas

/*export default () => (
        <AuthConsumer>
            { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) 

            }
        </AuthConsumer>

)*/