import dataStore from '../dataStore';
import { UserContext } from '../App';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutPage() {
    const { logout } = dataStore();
    const obj = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        logout()
            .then(() => {
                obj.setUser(null);
                navigate('/', { replace: true });
            })
            .catch((err) => {
                
                if (err.code === 'ERR_NETWORK') {
                    alert('توجد مشكلة في الاتصال، ربما لم يتم تسجيل خروجك بشكل صحيح، يرجى إعادة المحاولة')
                } else if (err.response.status === 403) {
                    navigate("/login", { replace: true });
                } else {
                    alert('حدثت مشكلة غير معروفة يرجى الاتصال بمدير النظام' + err.response.status)
                    navigate("/login", { replace: true });
                }
            })
            .finally(() => {
                obj.setUser(null);
                navigate('/', { replace: true });
            })
    });

    return (
        <div style={{ height: '90vh' }} className="row align-items-center justify-content-center">
            <div className="col-md-4 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Working...</span>
                </div>
            </div>
        </div>
    )
}