import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NoLogin ({user}){
    const navigate = useNavigate();
    useEffect(()=>{
        if(user!=null)
        navigate("/")
    })
    return(<div>
        Please Login to Continue
    </div>);
}
export default NoLogin;