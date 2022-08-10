import React from 'react'
import Card from '../components/card'
import FormGroup from "../components/form-group"
import {withRouter} from 'react-router-dom'

import axios from 'axios'

class Login extends React.Component{

    state = {
        email: '',
        senha: '',
        mensagemErro: null

    }

    entrar = () => {

        axios.post('http://localhost:8080/api/usuarios/autenticar', {
            email: this.state.email,
            senha: this.state.senha

        }).then(response => {
            console.log(response)
        }).catch(erro => {
            this.setState({mensagemErro: erro.response.data})
        })
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
                            <div className='row'>
                                <span>{this.state.mensagemErro}</span>
                            </div>
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
                                        <button onClick={this.entrar} className='btn btn-success'>Entrar</button>
                                        <button onClick={this.prepareCadastrar} className='btn btn-danger'>Cadastrar</button>

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

export default withRouter(Login)