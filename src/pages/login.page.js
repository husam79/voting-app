import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import dataStore from "../dataStore";
import { UserContext } from '../App';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = dataStore();
    const obj = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        let response = await login(username, password);

        setIsLoading(false);

        if (response) {
            setErrMsg('')
            obj.setUserId(1)
            navigate("/vote", { replace: true });
        } else {
            setErrMsg('Username or password are not correct')
        }

    }

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>مرحبًا بكم في نظام التصويت الداخلي</h2>
            <form onSubmit={handleSubmit}>
                <div className="card" style={styles.login}>
                    <h5 className="card-header">تسجيل الدخول</h5>
                    <div className="card-body">
                        {errMsg !== '' && <label>{errMsg}</label>}
                        <div className="mb-3">
                            <label for="username" className="form-label">اسم المستخدم</label>
                            <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label for="password" className="form-label">كلمة المرور</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="btn btn-primary">دخول</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

let styles = {
    container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee'
    },
    login: {
        width: '300px',        
        textAlign: 'right'
    },
    header:{
        marginBottom: 32
    }
}