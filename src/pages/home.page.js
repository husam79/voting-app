import { useContext, useState, useEffect } from "react"
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom";
import dataStore from "../dataStore";
import MsgBox from "../components/msgbox";

export default function HomePage() {
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const obj = useContext(UserContext);
    const navigate = useNavigate();
    const { getSelectedCandidatesAsync } = dataStore();
    const [modalConfig, setModalConfig] = useState({
        show: false,
        title: '',
        body: ''
    });

    const errorManipulaton = (err) => {
        if (err.code === 'ERR_NETWORK') {
            setModalConfig({
                show: true,
                title: 'مشكلة في الإتصال',
                body: 'توجد مشكلة في الاتصال، حاول مجددا من فضلك'
            })
        } else if (err.response.status === 403) {
            navigate("/login", { replace: true });
        } else {
            setModalConfig({
                show: true,
                title: 'مشكلة في الإتصال',
                body: 'حدثت مشكلة غير معروفة يرجى الاتصال بمدير النظام' + err.response.status
            })
            navigate("/login", { replace: true });
        }
    }

    useEffect(() => {
        if (obj.user === null) {
            navigate("/login", { replace: true });
        } else {
            setIsLoading(true);
            getSelectedCandidatesAsync()
                .then((data) => {
                    if (data.length > 0) {
                        setSelectedCandidates(data);
                    }
                    else {
                        navigate('/vote', { replace: true })
                    }

                    setShowContent(true)
                    setIsLoading(false)
                })
                .catch(err => {
                    errorManipulaton(err)
                })
                .finally(() => setIsLoading(false))
        }
    }, [])

    return (
        <div className="container">
            <MsgBox
                title={modalConfig.title}
                body={modalConfig.body}
                type='close'
                show={modalConfig.show}
                onHide={() => setModalConfig({
                    show: false,
                    title: '',
                    body: ''
                })}
            />
            {!isLoading && showContent &&
                <>
                    <div className="row mt-4 align-items-center justify-content-center">
                        <div className="col-md-4 text-center alert alert-success" role="alert">
                            <h2>شكرًا لكم للتصويت</h2>
                        </div>
                    </div>

                    <div className="row mt-4 align-items-center justify-content-center">
                        <div className="col-md-6">
                            <div style={{ fontSize: '1.2rem' }} className="mt-4 mb-3">لقد اخترت <strong>{selectedCandidates.length}</strong> مرشح:</div>
                            {selectedCandidates.map(item => <div style={{ fontSize: '1.2rem' }} key={item.id}>{item.full_name}</div>)}
                        </div>
                    </div>
                </>
            }

            {isLoading &&
                <div style={{ height: '90vh' }} className="row align-items-center justify-content-center">
                    <div className="col-md-4 text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}