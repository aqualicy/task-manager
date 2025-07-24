import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from "./components/Table";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

function App() {

  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Age', accessor: 'age' },
    { Header: 'City', accessor: 'city' },
  ];

  const data = [
    { name: 'Alice', age: 30, city: 'New York' },
    { name: 'Bob', age: 24, city: 'Los Angeles' },
    { name: 'Charlie', age: 35, city: 'Chicago' },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is the app!
        </p>
        <Table columns={columns} data={data} />
      </header>
    </div>
  );
}

export default App;
