import React,{Component} from 'react';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';

class App extends Component {

  state={
    termino:'',
    imagenes : [],
    pagina:''
  }

  scroll=()=>{
    const elemento = document.querySelector('.junbotron');
    elemento.scrollIntoView('smooth','start');
  }

  paginaAnterior = ()=>{
    let pagina = this.state.pagina;

    if(pagina===1)return null;

     pagina-=1;

    this.setState({
      pagina
    },()=>{
      this.consultarApi();
      this.consultarApi();
    });


  }

  paginaSiguiente = ()=>{
    let pagina = this.state.pagina;
    pagina +=1;

    this.setState({
      pagina
    },()=>{
      this.consultarApi();
      this.scroll();
    });

  }

  consultarApi = ()=>{
    const pagina = this.state.pagina;
    const termino = this.state.termino;
    const url = `https://pixabay.com/api/?key=12823277-ac9dc44c449a1cef2cee8c79b&q=${termino}
                &per_page=30&page=${pagina}`;
    
    fetch(url)
      .then(respuesta=>respuesta.json())
      .then(resultado => this.setState({imagenes:resultado.hits}))
  }

  datosBusquedas = (e)=>{
    this.setState({
      termino:e,
      pagina:1
    },()=>{
      this.consultarApi();
    })
  }
  render(){
  return (
    <div className="app container">
      <div className="junbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Buscador datosBusquedas={this.datosBusquedas}/>
      </div>
      <div className="row justify-content-center">
      <Resultado 
        imagenes={this.state.imagenes}
        paginaAnterior={this.paginaAnterior}
        paginaSiguiente={this.paginaSiguiente}
      />
      </div>

    </div>
  );
}
}
export default App;
