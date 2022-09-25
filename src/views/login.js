import React from "react";
import Card from '../components/card'
import FormGroup from "../components/form-group"
import {withRouter} from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'
import {mensagemErro} from '../components/toastr'

import { AuthContext } from "../main/provedorAuthenticacao";

class Login extends React.Component{

    state = {
        email: '',
        senha: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    entrar = async () => {
        this.service.autenticar({

            email: this.state.email,
            senha: this.state.senha

        }).then(response => {
            this.context.iniciarSessao(response.data)
            this.props.history.push("/home")
        }).catch(erro => {
           mensagemErro(erro.response.data)
        })

        console.log('Executado a requisição')
    }

    prepareCadastrar = () => {

        this.props.history.push('/cadastro-usuario')
    }

    render(){

        return(
            
            <div className='row'>
                <div className='col-md-6' style={{positon: 'relative', left:'300px'}}  >
                    <div className='bs-docs-section'>
                        <Card title='Login'>
                            <div className='col-lg-12'>
                                <div className='bs-component'>
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="inputEmail">
                                                <input type="email"
                                                value={this.state.email}
                                                id="inputEmail"
                                                className="form-control"
                                                onChange={e => this.setState({email: e.target.value})} 
                                                aria-describedby="emailHelp" 
                                                placeholder="Digite o Email"/>
                                        </FormGroup>
                                        
                                        <FormGroup label="Senha: *" htmlFor="inputSenha">
                                            <input type="password"
                                                    value={this.state.senha}
                                                    id="inputSenha"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    onChange={e => this.setState({senha: e.target.value})} />
                                        </FormGroup>

                                        <br />
                                        <button onClick={this.entrar} className='btn btn-success'>
                                            <i className="pi pi-sign-in"></i> Entrar
                                        </button>
                                        <button onClick={this.prepareCadastrar} className='btn btn-danger' >
                                            <i className="pi pi-plus"></i> Cadastrar
                                        </button>
                                    </fieldset>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

            </div>

        )


    }
}

Login.contextType = AuthContext

export default withRouter(Login)