import React from 'react';
import './styles/App.scss';
import AppRouter from './routers/AppRouter';
import AuthProvider from './contexts/AuthProvider';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </div>
  );
}

export default App;
