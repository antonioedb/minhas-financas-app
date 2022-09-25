import ApiService from "../apiservice";
import ErroValidacao from "./exception/ErroValidacao";

class UsuarioService extends ApiService {

    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais);
    }

    validar(usuario){
        const erros = [];

        if(!usuario.nome){
            erros.push("O campo nome é obrigatório.")
        }
        if(!usuario.email){
            erros.push("O campo Email é obrigatório.")
        }
        if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            erros.push('O email não está em um padrão válido.')
        }
        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Digite a senha nos dois campos.')
        }else if(usuario.senha !== usuario.senhaRepeticao){
            erros.push('As senhas não estão iguais.')
        }

        if(erros && erros.length > 0 ){
            throw new ErroValidacao(erros)
        }

    }
    
    obetrSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`)
    }

    salvar (usuario){
        return this.post('/',usuario);
    }
}

export default UsuarioService