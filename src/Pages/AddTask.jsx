import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Loading from './Loading';
import toast from 'react-hot-toast';
import { useLayoutEffect, useState } from 'react';

export default function AddTask() {

    const navigate = useNavigate()

    const previous = () => {
        navigate('/')
    }
    const viewTask = () => {
        navigate('/view')
    }

    const [isLoading, setLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState("")

    

    const { register, handleSubmit,formState: { errors }, reset, setValue, } = useForm()

        const { id } = useParams()
        if (!id) {
            setValue('taskName', "")
            setValue('taskStatus',"")
        }

    const onHandleSubmit = (data) => {
        if (!id) {
            setLoadingMessage("Adding task...")
            setLoading(true)
            setTimeout(async () => {
                const res = await axios.post('https://taskmanager-backend-new.vercel.app/api/addTask', data, {
                    headers: {'Content-Type': 'application/json'}

                })
                const resData = res.data
                setLoading(false)
                console.log(resData)
                if (resData.status) {
                    toast.success("Task added Successfully !!")
                    navigate('/view')
                    reset()
                } else {
                    toast.error("Something went wrong !!")
                }
            }, 1000);
        } else{
            setLoadingMessage("Updating Task...")
            setLoading(true)
            setTimeout(async () => {
                const res = await axios.put(`https://taskmanager-backend-new.vercel.app/api/updateTask/${id}`, data, {
                    headers: {'Content-Type': 'application/json'}
    
                })
                const resData = res.data
                setLoading(false)
                console.log(resData)
                if (resData.status) {
                    toast.success("Task updated Successfully !!")
                    reset()
                    navigate('/view')
                    
                } else {
                    toast.error("Something went wrong !!")
                }
            }, 1000);
        }
    }

    const getUserDetails = () => {
        if (!id) {
            return
        }
        setLoadingMessage("Getting Task...")
        setLoading(true)
        setTimeout(async () => {
            const res = await axios.get(`https://taskmanager-backend-new.vercel.app/api/getTask/${id}`)
            const resData = res.data
            setLoading(false)
            if (resData.status) {
                const taskObj = resData.message
                setValue('taskName', taskObj.taskName)
                setValue('taskStatus', taskObj.taskStatus)
   
            }

        }, 1000);
    }

    useLayoutEffect(() => {
        getUserDetails()
    }, [])

    

    const taskStatus = ['Completed', 'Pending']
    return (
        <>

            {
                isLoading &&
                <Loading message={loadingMessage} />
            }
            <div className="container1">
                <div className="box">
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <h3>Add Your Task :</h3>
                        <div className="input-field">
                            <label>Task Name</label>
                            <input type="text" placeholder='Enter your task here..' {...register('taskName', {
                                required: '*Task is mandatory !'
                            })} />
                            {errors.taskName && <p>{errors.taskName.message}</p>}
                        </div>
                        <div className="input-field">
                            <label>Tast Status</label>
                            <select {...register('taskStatus', {
                                required: '*Status is mandatory !'
                            })}>
                                <option value=''>Select your status</option>
                                {/* <option value='pending'>Pending</option>
                                <option value='completed'>Completed</option> */}
                                {
                                    taskStatus.map((item, index) => {
                                        return (
                                            <option key={index}>{item}</option>
                                        )
                                    })
                                }
                            </select>
                            {errors.taskStatus && <p>{errors.taskStatus.message}</p>}
                        </div>
                        <button type='submit'>{id ? "Update Task" : "Add Task"}</button>
                    </form>
                </div>

                <div className="btn">
                    <button onClick={previous}>Get Back</button>
                    <button onClick={viewTask}>View Task</button>
                </div>

            </div>
        </>
    )
}