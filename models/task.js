import React, { createContext, useState } from 'react';
import {getData} from '../helpers/getData'

export const tasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [foto, setFoto] = useState('');
  const [origin, setOrigin] = useState({
    latitude: -17.784778, 
    longitude: -63.180375
  });
  async function putData() {
    const data =  await getData();
    setTasks(data)
  }

  const addFoto = (photo) => {
    setFoto(photo)
  } 

  return (
    <tasksContext.Provider value={{putData, tasks, setTasks, foto, addFoto, origin, setOrigin}}>
      {children}
    </tasksContext.Provider>
  );
};
