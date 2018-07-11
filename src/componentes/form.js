import React, { Component } from 'react';

class FormVengador extends Component{
  constructor(){
    super();
    this.state={
      nombreVengador:'',
        Historia:'',
        Poder:''
    };
    this.handleInput=this.handleInput.bind(this);
    this.handleSumit=this.handleSumit.bind(this);
  }
  handleInput(e){

    const { value, name}=e.target;

    this.setState({
      [name]:value
    });

  }

handleSumit(e){

   e.preventDefault();
   this.props.onAddVengador(this.state);
   this.setState({
     nombreVengador:'',
       Historia:'',
       Poder:''
 });

}

  render(){
    return(
     <div className="card">
      <form onSubmit={this.handleSumit} className="card-body" >
           <div className="form-group">
           <input type="text"
            name="nombreVengador"
            value={this.state.nombreVengador}
            onChange={this.handleInput}
            className="form-control"
            placeholder="Nombre Vengador"
            />
           </div>
           <div className="form-group">
           <input type="text"
            name="Historia"
              value={this.state.Historia}
            onChange={this.handleInput}
            className="form-control"
            placeholder="Historia"
            />
            </div>
            <div className='form-group'>
            <input type="text"
             name="Poder"
             value={this.state.Poder}
             onChange={this.handleInput}
             className="form-control"
             placeholder="Poder"
             />
         </div>
         <button type="submit" className="btn btn-primary">
              Save
       </button>
      </form>
    </div>
  );
  }
}

export default FormVengador;
