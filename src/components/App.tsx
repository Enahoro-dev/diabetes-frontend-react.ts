import React from 'react';
import '../App.css';
import Header from './Header';
import Container from './formcontainer'

function App() {
  return (
    <div className="w-11/12 mx-auto sm:w-3/4 md:w-3/5 lg:w-1/2">
      <div className=''>
        <Header/>
        <Container/>
      </div>
    </div>
  );
}

export default App;
