import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Table from "./components/Table";
import TaskManagerService from "./services/task-manager-service";
import {Task} from "./models/Task";

export default function App() {

  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);

  /**
   * Get Tasks
   *
   * @returns {void}
   */
  const getTasks = (): void => {
    const service = new TaskManagerService();
    // setLoading(true);
    service
        .GetTasks()
        .then((response) => {
          console.log(response);
          setTasks(response.data);
          // setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          // setLoading(false);
        });
  };

  /**
   * Fetches and processes decision data using the `id` from the URL.
   * @returns {Promise<void>} - A promise that resolves when the data fetching and processing are complete.
   */
  const fetchData = async () => {
    // const searchParams = new URLSearchParams(window.location.search);
    // const id = searchParams.get('id');
    if (!tasks) {
      getTasks();
    }
  };

  useEffect(() => {
    fetchData().then();
  }, [fetchData]);

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
