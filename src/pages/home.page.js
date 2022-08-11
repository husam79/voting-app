import { useContext, useEffect, useState } from "react"
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom";
import dataStore from "../dataStore";

export default function HomePage() {
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const obj = useContext(UserContext);
    const navigate = useNavigate();
    const { getSelectedCandidatesAsync } = dataStore();

    useEffect(() => {
        if (obj.userId === 0) {
            navigate("login", { replace: true });
        } else {
            setIsLoading(true);
            getSelectedCandidatesAsync()
                .then((data) => {
                    if (data.length > 0) {
                        setSelectedCandidates(data);
                    }
                    else {
                        navigate('vote', { replace: true })
                    }

                    setShowContent(true)
                    setIsLoading(false)
                })
        }
    }, [])

    return (
        <div className="container">
            {!isLoading && showContent &&
                <>
                    <div className="row mt-4 align-items-center justify-content-center">
                        <div className="col-md-4 text-center">
                            <h2>شكرًا لكم للتصويت</h2>
                        </div>
                    </div>

                    <div style={{ fontSize: '1.2rem' }} className="mt-4">لقد اخترت المرشحين التالية أسماؤهم:</div>
                    <ul style={{ fontSize: '1.2rem' }}>
                        {selectedCandidates.map(item => <li>{item.full_name}</li>)}
                    </ul>
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