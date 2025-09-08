import { Link } from "react-router-dom"
import { Button } from "./Button"
import { TaskContext } from "../context/TaskContext"
import { useContext } from "react"
import { AuthForm } from "./AuthForm"
import { useNavigate} from "react-router-dom";

export const Header = () => {
    const {handleLogout, user, isAuthenticated} = useContext(TaskContext);
    const navigate = useNavigate()

    if(!isAuthenticated){
        return;
    }

    return  <nav>
                <div>
                    <p>Logged in as: {user?user.email:''}</p>
                    <Button 
                    type={'button'} 
                    handleClick={()=>{handleLogout(); navigate('/');}} 
                    content={'Logout'}/>
                </div>
                <Link to='/tasklist'>All Tasks</Link> |
                <Link to='/create'>Create Task</Link> | 
                <Link to='/admin'>Admin panel</Link> | 
                <Link to='/category'>Add Category</Link>
            </nav>
}