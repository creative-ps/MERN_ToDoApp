import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import TaskList from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";
import { TaskProvider } from "./context/TaskContext";
import { AppErrors } from "./GlobalErrorsAndSuccess";
import { Header } from "./components/Header";
import { AdminPanel } from "./components/AdminPanel";

export default function App (){
    return <>
              <TaskProvider>
                <BrowserRouter>
                  <h1>This is a todo Task Application.</h1>
                  <AppErrors/>
                  <Header/>
                  <Routes>
                    <Route path="/" element={<TaskList/>}/>
                    <Route path="/create" element={<TaskForm/>}/>
                    <Route path="/admin" element={<AdminPanel/>}/>
                  </Routes>
                </BrowserRouter>
              </TaskProvider>
           </>
}