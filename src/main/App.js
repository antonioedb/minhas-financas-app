import React from 'react';

import Rotas from './rotas';

import 'bootswatch/dist/cosmo/bootstrap.css'
import Navbar from "../components/navbar"

import '../custom.css'

class  App extends React.Component {

  render (){
    return(
      <>
        <Navbar />
        <div className='container'>
            <Rotas />

        </div>
      </>
    )
  }
}   



export default App;
