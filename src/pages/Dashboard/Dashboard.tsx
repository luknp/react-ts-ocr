import React from 'react';
import logo from 'logo.svg';
import './style.scss';

function Dashboard() {
  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1>Dashboard</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
            Learn React
          </a>
        </header>
      </div>
    </div>
  );
}

export default Dashboard;
