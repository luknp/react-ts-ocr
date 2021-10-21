import React from 'react';
import logo from 'logo.svg';
import './style.scss';

function Dashboard() {
  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='App'>
        <header className='app-header'>
          <img src={logo} className='app-logo' alt='logo' />
          <h1>Dashboard</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a className='app-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
            Learn React
          </a>
        </header>
        <h1 className='text-blue-700 font-extrabold'>Hello World!</h1>
        <p className='tracking-widest'>This is my first React App.</p>
      </div>
    </div>
  );
}

export default Dashboard;
