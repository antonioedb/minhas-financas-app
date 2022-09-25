import React from 'react';
import Rotas from './rotas';
import ProvedorAuthenticacao from './provedorAuthenticacao';

import 'bootswatch/dist/cosmo/bootstrap.css'
import Navbar from "../components/navbar"
import 'toastr/build/toastr.min.js'
import '../custom.css'
import 'toastr/build/toastr.css';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons


class  App extends React.Component {

  render (){
    return(
      <ProvedorAuthenticacao>
        <Navbar />
        
        <div className='container'>
            
            <Rotas />

        </div>
      </ProvedorAuthenticacao>
    )
  }
}   



export default App;
