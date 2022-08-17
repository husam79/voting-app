import { useContext, useState, useEffect } from "react"
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom";
import dataStore from "../dataStore";
import MsgBox from "../components/msgbox";

export default function ResultsPage() {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const obj = useContext(UserContext);
    const navigate = useNavigate();
    const { getCandidatesResultAsync } = dataStore();
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
            getCandidatesResultAsync()
                .then((data) => {
                    if (data.length > 0) {
                        setResults(data);
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

    const even_style = {
        backgroundColor: '#21252933',
        fontSize: '1.2rem'
    }

    const odd_style = {
        backgroundColor: '#fff',
        fontSize: '1.2rem'
    }

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
                        <div className="col-md-3">
                            <div className="row" style={{ fontSize: '1.2rem' }}>
                                <div className="col-6 text-center bg-dark text-light p-1">اسم المرشّح</div>
                                <div className="col-6 text-center bg-dark text-light p-1">عدد الأصوات</div>
                            </div>
                            {results.map((item, index) =>
                                <div className="row" style={index % 2 === 1 ? even_style : odd_style} key={item.id}>
                                    <div className="col-6 text-center p-1">{item.full_name}</div>
                                    <div className="col-6 text-center p-1">{item.votes}</div>
                                </div>
                            )}
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