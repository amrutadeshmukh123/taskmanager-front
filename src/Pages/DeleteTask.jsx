import axios from "axios"
import { useLayoutEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "./Loading"

export default function DeleteTask() {

    const [isLoading, setLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState("")


    const {id} = useParams()
    const navigate = useNavigate()

    const deleteTask = ()=>{
        
        setLoadingMessage("Deleting Task...")
        setLoading(true)
        setTimeout(async() => {           
                const res = await axios.delete(`https://taskmanager-backend-new.vercel.app/api/deleteTask/${id}`)
                const resData = res.data
                if (resData.status) {
                    toast.success("Task deleted successfully !!")
                    navigate('/view')
                   
                // } else {
                //     toast.error('something went wrong')
                }
            
        }, 1000);
    }

    useLayoutEffect(() => {
        deleteTask()
    }, [])


    return (
        <>
         {
                isLoading &&
                <Loading message={loadingMessage} />
            }

        </>
    )
}