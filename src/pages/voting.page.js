import { useEffect, useState } from "react";
import CandidatesList from "../components/candidates-list";
import dataStore from '../dataStore';

export default function VotingPage() {
    const { getAllCandidatesAsync } = dataStore();
    const [candidates, setCandidates] = useState([]);
    //const [enableVoting, setEnableVoting] = useState(false);
    const [selectedCandidates, setSelectedCandidates] = useState([]);

    const handleSelectionChanged = (group) => {
        setSelectedCandidates(group);
    }

    useEffect(() => {
        const getAll = async () => {
            const results = await getAllCandidatesAsync();

            setCandidates(results);
        }

        getAll();
    }, []);

    let enableVoting = selectedCandidates.length <= 7 && selectedCandidates.length > 0;

    return (
        <div className="container">
            <div className="row align-items-center justify-content-center mt-4">
                <div className="col-sm-12 d-md-none mb-4">
                    <button disabled={!enableVoting} className="btn btn-danger w-100">صوّت الآن</button>
                </div>
                <div className="col-lg-4 col-md-6 d-none d-md-block d-flex justify-content-start">
                    <button disabled={!enableVoting} className="btn btn-danger" style={styles.voteButton}>صوّت الآن</button>
                </div>

                <div className="col-sm-12 col-lg-4 col-md-6 align-self-center">
                    <div style={{ textAlign: 'center' }} className = {selectedCandidates.length === 7 ? "alert alert-success": "alert alert-secondary"} role="alert">
                        {selectedCandidates.length > 0 && <span>تمّ اختيار &nbsp;<strong style={{ fontSize: '1.1rem' }}>{selectedCandidates.length}</strong>&nbsp; مرشّح</span>}
                        {selectedCandidates.length === 0 && <span>لم يتم اختيار أي مرشّح</span>}
                    </div>
                    <CandidatesList onSelectionChanged={handleSelectionChanged} candidates={candidates} />
                </div>
            </div>
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