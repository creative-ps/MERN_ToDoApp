import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthForm } from "./components/AuthForm";
import TaskList from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";
import { TaskProvider } from "./context/TaskContext";
import { AppMessage } from "./GlobalMessage";
import { AdminPanel } from "./components/AdminPanel";
import { Category } from "./components/Category";
import { ProtectedRoute } from "./protectedRoute/ProtectedRoute";

export default function App (){
    return <>
              <TaskProvider>
                <BrowserRouter>
                  <div className="bg-blue-500 flex items-center justify-center">
                    <h1 className="text-3xl font-bold text-white p-3">TodoHub.</h1>
                  </div>
                  <AppMessage/>
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