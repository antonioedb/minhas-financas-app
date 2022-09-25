import React from "react"
import AuthService from "../app/service/authService";
//import { AuthConsumer } from "../main/provedorAuthenticacao";



function NavbarItem(props){

    //if(AuthService.isUsuarioAutenticado()){
    if(true){
        return(
            <li className="nav-item">
                <a onClick={props.onClick} className="nav-link" href={props.href}>{props.label}</a>
            </li>
        )

    }else{
        return false;
    }

}

export default NavbarItem

/*export default () => (
    <AuthConsumer>
        {(context) => (
            <NavbarItem isUsuarioAutenticado = {context.isAutenticado} />
        )}
    </AuthConsumer>
)*/