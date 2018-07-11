import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from 'firebase';
import {DB_CONFIG} from './config/config.js';
import 'firebase/database';
import './App.css';
import Navegataion from './componentes/navegetaion.js';
//import { Vengadores} from './todos.json';
import FormVengador from './componentes/form.js';
class App extends Component {
  constructor(){
    super();
    this.state={
      Vengadores:[

      ]
    };
      this.handleAddVengador=this.handleAddVengador.bind(this);
      this.app = firebase.initializeApp(DB_CONFIG);//enlazo la conexion con firebase
      this.db=this.app.database().ref().child('vengadores');//lo guardo en una colecicon
  }
 componentDidMount(){
   const vengadores= this.state.Vengadores;
   /////Se actuliza la vista cada vez que agregar un item
    this.db.on('child_added', snap=>{
      vengadores.push({
        vengador_id: snap.key,
        nombreVengador:snap.val().nombreVengador,
        Historia:snap.val().Historia,
        Poder:snap.val().Poder
      })
      this.setState({vengadores});
    });


    this.db.on('child_removed', snap=>{
     for (var i = 0; i < vengadores.length; i++) {
       if(vengadores[i].vengador_id=snap.key){
         vengadores.splice(i,1);
       }
     }
    this.setState({vengadores});
    });
 }
  handleAddVengador(vengador){
  /*  this.setState({
      Vengadores: [...this.state.Vengadores,vengador]
    })*/

    this.db.push().set(vengador);
  }
  removeVengadores(index) {

    this.db.child(index).remove();
  /* this.setState({
     Vengadores: this.state.Vengadores.filter((e, i) => {
       return i !== index
     })
   });*/
 }
  render() {
  const vengador=  this.state.Vengadores.map((venga,i)=>{
      return(
          <div className="col-md-4" key={i}>
              <div className="card mt-4">
                  <div className="card-header">
                    <h3>   {venga.nombreVengador}  </h3>
                  </div>
              </div>
              <div className="card body">
                <p>{venga.Historia} </p>
                <p>{venga.Poder} </p>
              </div>
              <div className="card-footer">
                      <button
                        className="btn btn-danger"
                        onClick={this.removeVengadores.bind(this, venga.vengador_id)}>
                        Delete
                      </button>
              </div>
          </div>
      )
    });

    return (
      <div className="App">
          <Navegataion  titulo="Navs Vengadores" vengadores={this.state.Vengadores.length}/>

                <div className="container">
                      <div className="row mt-4">
                      <div  className="col-md-3">
                      <img src={logo} className="App-logo" alt="logo" />
                      <FormVengador onAddVengador={this.handleAddVengador}/>
                      </div>
                          <div  className="col-md-9">
                                <div  className="row">
                                      {vengador}
                              </div>
                           </div>
                      </div>
                 </div>

      </div>
    );
  }
}

export default App;
