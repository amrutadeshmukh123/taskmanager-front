import './Loading.css';

export default function Loading({message}){
    return(
        <>
        <div className="loader">
            <div className="box">
                <div className="circle"></div>
                <p>{message}</p>
            </div>
        </div>
        </>
    )
}