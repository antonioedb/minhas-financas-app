import React from "react";
import { withRouter } from "react-router-dom";

import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/locastoregeService";
import Card from "../../components/card";
import FromGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
 
import * as messages from '../../components/toastr'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button'

class ConsultaLancamentos extends React.Component{
 
    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: [],
        mostraDialogoConfirmacao: false,
        lancamentoDeletar: {}
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {

        if(!this.state.ano){
            messages.mensagemErro('O preenchimento do campo ano é obrigatório')
            return false
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            usuario: usuarioLogado.id,
            descricao: this.state.descricao,
            
        }

        this.service
            
            .consultar(lancamentoFiltro)
            .then(resposta => {
                const lista = resposta.data;
                if(lista.length < 1){
                   messages.mensagemAlerta("Nenhum resultado encontrado.") 
                }
                this.setState({lancamentos: resposta.data})
            }).catch(error => {
                console.log(error)
            })
    }
    editar = (id) =>{
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }
    abrirConfirmacao = (lancamento) => {
        this.setState({mostraDialogoConfirmacao: true, lancamentoDeletar: lancamento})
    }
    cancelarDelecao =  () => {
        this.setState({mostraDialogoConfirmacao: false, lancamentoDeletar:{} })
    }

    deletar = () => {
        this.service
            .deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar)
                lancamentos.splice(index, 1)
                this.setState(lancamentos)
                this.cancelarDelecao()
                messages.mensagemSucesso('Lançamento deletado com sucesso.')
            }).catch(error =>{
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o lançamento.')
            })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-lancamentos')
        //console.log(lancamento)
    }

    alterarStatus = (lancamento, status) => {
        
        this.service
            .alterarStatus(lancamento.id, status)
            .then( response => {
                console.log(lancamento)
                const lancamentos = this.state.lancamentos
                const index = lancamentos.indexOf(lancamento)
                if(index !== -1){
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    this.setState({lancamento});
                }
                messages.mensagemSucesso('Status atualizado com sucesso!')
            })
    }

    render(){

        const meses = this.service.obterListaMeses();

        const tipos = this.service.obeterListaTipos();

        const confirmaDialog = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );
        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FromGroup htmlFor="inputAno" label="Ano: *">
                                <input  type="text" 
                                        className="form-control" 
                                        id="inputAno" 
                                        value={this.state.ano} 
                                        onChange={e => this.setState({ano: e.target.value})}
                                        placeholder="Digite o Ano" />
                            </FromGroup>
                            <FromGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu id='inputMes' 
                                            value={this.state.mes}
                                            onChange={e =>this.setState({mes: e.target.value})}
                                            className="form-control" 
                                            lista={meses} />                               
                            </FromGroup>
                            <FromGroup htmlFor="inputDescricao" label="Descrição: ">
                                <input  type="text" 
                                        className="form-control" 
                                        id="inputDescricao" 
                                        value={this.state.descricao} 
                                        onChange={e => this.setState({descricao: e.target.value})}
                                        placeholder="Digite a descrição" />
                            </FromGroup>
                            <FromGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                                <SelectMenu id="inputTipo" 
                                            value={this.state.tipo}
                                            onChange={e =>this.setState( {tipo: e.target.value})}
                                            className="form-control" 
                                            lista={tipos} />                               
                            </FromGroup>

                            <br />

                            <button onClick={this.buscar}    type="button" className="btn btn-success">
                                <i className="pi pi-search"></i> Buscar
                            </button>
                            
                            <button onClick={this.preparaFormularioCadastro} type="button" className="btn btn-danger">
                                <i className="pi pi-plus"></i> Cadastrar
                            </button>


                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component" >
                            <LancamentosTable lancamentos={this.state.lancamentos}  
                                deleteAction={this.abrirConfirmacao}
                                editAction={this.editar}
                                alterarStatus={this.alterarStatus} />

                        </div>
                    </div>
                </div>
                <div>
                <Dialog header="Confirmação" 
                        visible={this.state.mostraDialogoConfirmacao} 
                        style={{ width: '50vw' }} 
                        modal={true}
                        footer={confirmaDialog} 
                        onHide={() =>this.setState({mostraDialogoConfirmacao: false})}>

                    <p>Confirma a exclusão do lancamento?.</p>
                </Dialog>

                </div>
            </Card>

        )
    }

}

export default withRouter(ConsultaLancamentos)