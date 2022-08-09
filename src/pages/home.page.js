import { useContext, useEffect } from "react"
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const obj = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (obj.userId === 0) {            
            navigate("login", { replace: true });
        }
    }, [] )

    return (<h2>Home</h2>)
}