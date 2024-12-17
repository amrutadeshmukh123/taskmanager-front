import { NavLink, useNavigate } from 'react-router-dom';
import './View.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ViewTask() {


    const [data, setdata] = useState([])
    const navigate = useNavigate()

    const [userSearch,setUserSearch] = useState('')
    const filteredData = data.filter((item) => {
        return userSearch.toLowerCase() === '' 
            ? item 
            : item.taskName.toLowerCase().includes(userSearch.toLowerCase());
    });

    const users = data
    const itemPerPage = 6
    const [currentPage, setCurrentPage] = useState(1)
    const currentPageData = filteredData.slice((currentPage-1)*itemPerPage,currentPage*itemPerPage) 
    const totalPages = Math.ceil(users.length / itemPerPage)


   
    

    const previous = () => {
        navigate('/')
    }
    const viewTask = () => {
        navigate('/add')
    }

   

    const fetchData = async () => {
        const response = await axios.get("https://back-end-theta-sandy.vercel.app/api/getTask")
        setdata(response.data.message)
        
    }

    useEffect(() => {
        fetchData()
    }, [])

    const getRowColor = (taskStatus) =>{
        if (taskStatus === 'Pending') return "crimson"
        if (taskStatus === 'Completed') return "black"
        // return "black";
    }

    

    return (
        <>
            <div className="container2">
                <div className="input-field">
                    <label htmlFor="">Search your task here:</label>
                    <input type="text" placeholder='Enter text to search' value={userSearch} onChange={(e)=>{setUserSearch(e.target.value)}}/>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Sr.No.</th>
                            <th>Your Tasks</th>
                            <th>Completion Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan="4">No Task Found !!</td>
                                </tr>
                            ) : currentPageData.map((item, index) => {
                                return (
                                    <tr key={index}
                                      style={{color: getRowColor(item.taskStatus)}}>
                                        <td>{index+1}</td>
                                        <td>{item.taskName}</td>
                                        <td>{item.taskStatus}</td>
                                        <td><div className="action-btn">
                                        <NavLink to={`/updateTask/${item._id}`} title='Update Task'><i class="fa-solid fa-pen-to-square"></i></NavLink>
                                        <NavLink to={`/deleteTask/${item._id}`} title='Delete Task'><i class="fa-solid fa-trash"></i></NavLink>
                                        </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="pagination">
                    {
                        Array.from({ length: totalPages }, (_, i) => i + 1).map((item, index) => {
                            return (
                                <button onClick={() => setCurrentPage(item)} key={index} className={item===currentPage ? 'active-page' : ''}>{item}</button>
                            )
                        })
                    }
                </div>
                <div className="btn1">
                    <button onClick={previous}>Get Back</button>
                    <button onClick={viewTask}>Add Task</button>
                </div>
            </div>
        </>
    )
}