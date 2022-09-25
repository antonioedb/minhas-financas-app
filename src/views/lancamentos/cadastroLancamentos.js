import React from "react";

import { withRouter } from "react-router-dom";
import LancamentoService from "../../app/service/lancamentoService";
import Card from "../../components/card";
import FromGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import * as  messages from '../../components/toastr'
import LocalStorageService from "../../app/service/locastoregeService";

class CadastroLancamnetos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false

    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    componentDidMount(){
        const params = this.props.match.params

        if(params.id){
           this.service.obterPorId(params.id)
            .then(respose => {
                this.setState({...respose.data, atualizando:true})
            }) 
            .catch (error => {
                messages.mensagemErro(error.response.data)
            })
        }
        //console.log('params', params)
    }

    submit = () =>{

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const {descricao,valor,mes,ano,tipo} = this.state;
        const lancamento = {descricao,valor,mes,ano,tipo, usuario: usuarioLogado.id} 
       
        
        try {
            this.service.validar(lancamento)
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }
        
           
        

        this.service
            .salvar( lancamento)
            .then (response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento cadastrado com sucesso!')
            }).catch( error => {
                messages.mensagemErro(error.response.data)
            })
    }

    atualizar = () => {
        const {descricao,valor,mes,ano,tipo,status,id,usuario} = this.state;
        const lancamento = {descricao,valor,mes,ano,tipo,status, id, usuario} 
        
        this.service
            .atualizar( lancamento)
            .then (response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento atualizado com sucesso!')
            }).catch( error => {
                messages.mensagemErro(error.response.data)
            })

    }


    handleChange = (event) =>  {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value})
    }

    render(){
      
        const tipos = this.service.obeterListaTipos();
        const meses = this.service.obterListaMeses();

        return (
            <Card title={this.state.atualizando ? 'Atualização de Lançamento': 'Cadastro de Lançamentos'}>
                < div className="row">
                    <div className="col-md-12">
                        <FromGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao"  type="text" 
                                    className="form-control" 
                                    name="descricao"
                                    value={this.state.descricao}
                                    onChange={this.handleChange}
                            />
                        </FromGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FromGroup id="inputAno" label="Ano: *">
                            <input  id="inputAno" type="text" 
                                    className="form-control" 
                                    name="ano"
                                    value={this.state.ano}
                                    onChange={this.handleChange}
                                    />
                        </FromGroup>
                    </div>
                    <div className="col-md-6">
                        <FromGroup id="inputMes" label="Mes: *">
                            <SelectMenu id="inputMes"  
                                        lista={meses} 
                                        className="form-control"
                                        name="mes"
                                        value={this.state.mes}
                                        onChange={this.handleChange}
                                        />
                        </FromGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FromGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" type="text" 
                                    className="form-control" 
                                    name="valor"
                                    value={this.state.valor}
                                    onChange={this.handleChange}
                                    />
                        </FromGroup>
                    </div>
                    <div className="col-md-4">
                        <FromGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo"  lista={tipos} 
                                        className="form-control"
                                        name="tipo"
                                        value={this.state.tipo}
                                        onChange={this.handleChange}
                                        />
                        </FromGroup>
                    </div>
                    <div className="col-md-4">
                        <FromGroup id="inputStatus" label="Status: ">
                        <input id="inputStatus" type="text" 
                                className="form-control"
                                name="status"
                                value={this.state.status}
                                onChange={this.handleChange} 
                                disabled={true} 
                                />
                        </FromGroup>
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <div className="col-md-6">
                        { this.state.atualizando ? (
                                <button className="btn btn-primary" onClick={this.atualizar}>
                                    <i className="pi pi-refresh"></i> Atualizar
                                </button>
                            ) : (
                                <button className="btn btn-success" onClick={this.submit}>
                                    <i className="pi pi-save"></i> Salvar
                                </button>
                            )
                        }
                                              
                        <button onClick={e => this.props.history.push('/consulta-lancamentos')} className="btn btn-danger">
                            <i className="pi pi-times"></i> Cancelar
                        </button>
                    </div>
                </div>
            </Card>
        )

    }
}

export default withRouter(CadastroLancamnetos)