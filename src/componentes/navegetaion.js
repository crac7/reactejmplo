import React,{Component} from 'react';

class Navegataion extends Component{
  render(){
    return(
     <div className='App'>
      <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#">{this.props.titulo}
              <span className="badge badge-pill badge-light ml-2"> {this.props.vengadores}
              </span>
          </a>
      </nav>
    </div>
  );
  }
}

export default Navegataion;
