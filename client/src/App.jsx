import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthForm } from "./components/AuthForm";
import TaskList from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";
import { TaskProvider } from "./context/TaskContext";
import { AppMessage } from "./GlobalMessage";
import { Header } from "./components/Header";
import { AdminPanel } from "./components/AdminPanel";
import { Category } from "./components/Category";
import { ProtectedRoute } from "./protectedRoute/ProtectedRoute";

export default function App (){
    return <>
              <TaskProvider>
                <BrowserRouter>
                  <h1>This is a todo Task Application.</h1>
                  <AppMessage/>
                  <Header/>
                  <Routes>
                    <Route path="/" element={<AuthForm/>}/>
                    <Route element={<ProtectedRoute/>}>
                      <Route path="/tasklist" element={<TaskList/>}/>
                      <Route path="/create" element={<TaskForm/>}/>
                      <Route path="/create/:cat" element={<TaskForm/>}/>
                      <Route path="/admin" element={<AdminPanel/>}/>
                      <Route path="/category" element={<Category/>}/>
                    </Route>
                  </Routes>
                </BrowserRouter>
              </TaskProvider>
           </>
}