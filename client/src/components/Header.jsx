import { NavLink } from "react-router-dom"
import { Button } from "./Button"
import { TaskContext } from "../context/TaskContext"
import { useContext } from "react"
import { useNavigate} from "react-router-dom";

export const Header = () => {
    const {handleLogout, user} = useContext(TaskContext);
    const navigate = useNavigate()

    return  <nav className="flex justify-between mt-4 px-3 sm:px-7">
                <div className="grid grid-cols-4 divide-x-1 divide-solid divide-gray-500 text-center h-[25px]">
                    <NavLink className={({isActive})=>`text-gray-700 w-[120px]  ${isActive ? 'bg-blue-500 text-white' : ''}`} to='/tasklist'>All Tasks</NavLink> 
                    <NavLink className={({ isActive }) =>`text-gray-700 w-[120px]  ${isActive ? 'bg-blue-500 text-white' : ''}`} to='/create'>Create Task</NavLink> 
                    <NavLink className={({ isActive }) =>`text-gray-700 w-[120px]  ${isActive ? 'bg-blue-500 text-white' : ''}`} to='/admin'>Admin panel</NavLink> 
                    <NavLink className={({ isActive }) =>`text-gray-700 w-[120px]  ${isActive ? 'bg-blue-500 text-white' : ''}`} to='/category'>Add Category</NavLink>
                </div>
                <div className="flex justify-end align-middle px-2">
                    <p className="text-sm mr-2 mt-1">Logged in as: {user?user.email:''}</p>
                    <Button 
                    type={'button'} 
                    handleClick={()=>{handleLogout(); navigate('/');}} 
                    content={'Logout'}
                    className={'border-1 rounded-md bg-blue-500 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100'}
                    />
                </div>
            </nav>
}