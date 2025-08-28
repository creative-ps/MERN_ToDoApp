import { Link } from "react-router-dom"
import { Button } from "./Button"
import { TaskContext } from "../context/TaskContext"
import { useContext } from "react"
import { AuthForm } from "./AuthForm"

export const Header = () => {
    const {handleLogout, user, isAuthenticated} = useContext(TaskContext);
    if(!isAuthenticated){
       return <AuthForm/>
    }
    return  <nav>
                <div>
                    <p>Logged in as: {user?user.email:''}</p>
                    <Button type={'button'} handleClick={handleLogout} content={'Logout'}/>
                </div>
                <Link to='/'>All Tasks</Link> |
                <Link to='/create'>Create Task</Link> | 
                <Link to='/admin'>Admin panel</Link>
            </nav>
}