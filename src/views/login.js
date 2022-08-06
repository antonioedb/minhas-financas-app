import React from 'react'
import Card from '../components/card'
import FromGroup from '../components/form-group'

class Login extends React.Component{

stat = {
    email: '',
    senha: ''

}

    entrar = () =>{
        console.log('Email: ', this.stat.email)
        console.log('Senha', this.stat.senha)

    }

    render(){

        return(
            <div className="container">
                <div className='row'>
                    <div className='col-md-6' style={{positon: 'relative', left:'300px'}}  >
                        <div className='bs-docs-section'>
                            <Card title='Login'>
                                <div className='col-lg-12'>
                                    <div className='bs-component'>
                                        <fieldset>
                                            <FromGroup labal="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email" 
                                                    value={this.stat.email}
                                                    onChange={e => this.setState({email: e.target.value})}
                                                    className="form-control" 
                                                    id="exampleInputEmail1" 
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Digite o Email"/>
                                            </FromGroup>
                                            
                                            <FromGroup labal="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password" 
                                                    value={this.stat.senha}
                                                    onChange={e => this.setState({senha: e.target.value})}
                                                    className="form-control" 
                                                    id="exampleInputPassword1" 
                                                    placeholder="Password"/>
                                            </FromGroup>
                                            <br></br>
                                            <button onClick={this.entrar} className='btn btn-success'>Entrar</button>
                                            <button className='btn btn-danger'>Cadastrar</button>

                                        </fieldset>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                </div>

            </div>

        )


    }
}

export default Login