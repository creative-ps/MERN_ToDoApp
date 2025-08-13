import React from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import TaskList from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";
import { TaskProvider } from "./context/TaskContext";
import { AppErrors } from "./GlobalErrorsAndSuccess";
import { Header } from "./components/Header";

export default function App (){
    return <>
              <TaskProvider>
                <BrowserRouter>
                  <h1>This is a todo Task Application.</h1>
                  <Header/>
                  <AppErrors/>
                  <Routes>
                    <Route path="/" element={<TaskList/>}/>
                    <Route path="/create" element={<TaskForm/>}/>
                  </Routes>
                </BrowserRouter>
              </TaskProvider>
           </>
}