import { useContext, useEffect, useState } from "react";
import CandidatesList from "../components/candidates-list";
import dataStore from '../dataStore';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import MsgBox from "../components/msgbox";

export default function VotingPage() {
    const { getAllCandidatesAsync, voteAsync, getSelectedCandidatesAsync } = dataStore();
    const [candidates, setCandidates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [modalConfig, setModalConfig] = useState({
        show: false,
        title: '',
        body: ''
    });
    const obj = useContext(UserContext);
    const navigate = useNavigate();

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

    const handleSelectionChanged = (group) => {
        setSelectedCandidates(group);
    }

    const handleVoteNow = async () => {
        await voteAsync(selectedCandidates)
            .then(() => {
                navigate('/', { replace: true })
            })
            .catch((err) => {
                errorManipulaton(err);
            })
    }

    useEffect(() => {
        if (obj.user === null) {
            navigate("/login", { replace: true });
        } else {
            setIsLoading(true);
            getSelectedCandidatesAsync()
                .then((data) => {
                    if (data.length > 0) {
                        navigate('/', { replace: true })
                    }
                    else {
                        getAllCandidatesAsync()
                            .then((data) => {
                                if (data.length > 0) {
                                    setCandidates(data);
                                } else {
                                    setCandidates([]);
                                }

                                setShowContent(true)
                                setIsLoading(false)
                            })
                            .catch(err => {
                                errorManipulaton(err);
                            })
                            .finally(() => {
                                setIsLoading(false)
                            })
                    }
                })
                .catch(err => {
                    errorManipulaton(err);
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, []);

    let enableVoting = selectedCandidates.length <= 7 && selectedCandidates.length > 0;

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
                    <div className="row align-items-center justify-content-center mt-4">
                        <div className="col-sm-12 d-md-none mb-4">
                            <button onClick={handleVoteNow} disabled={!enableVoting} className="btn btn-danger w-100">صوّت الآن</button>
                        </div>
                        <div className="col-lg-4 col-md-6 d-none d-md-block d-flex justify-content-start">
                            <button onClick={handleVoteNow} disabled={!enableVoting} className="btn btn-danger" style={styles.voteButton}>صوّت الآن</button>
                        </div>

                        <div className="col-sm-12 col-lg-4 col-md-6 align-self-center">
                            <div style={{ textAlign: 'center' }} className={selectedCandidates.length === 7 ? "alert alert-success" : "alert alert-secondary"} role="alert">
                                {selectedCandidates.length > 0 && <span>تمّ اختيار &nbsp;<strong style={{ fontSize: '1.1rem' }}>{selectedCandidates.length}</strong>&nbsp; مرشّح</span>}
                                {selectedCandidates.length === 0 && <span>لم يتم اختيار أي مرشّح</span>}
                            </div>
                            <CandidatesList onSelectionChanged={handleSelectionChanged} candidates={candidates} />
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

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        justifyContent: 'center',
        width: '100vw',
        height: '88vh'
    },
    voteButton: {
        width: 250,
        height: 250,
        borderRadius: 125,
        fontSize: '3rem',

    }
}