import { useEffect, useState } from "react";
import CandidatesList from "../components/candidates-list";
import dataStore from '../dataStore';

export default function VotingPage() {
    const { getAllCandidatesAsync } = dataStore();
    const [candidates, setCandidates] = useState([]);
    const [enableVoting, setEnableVoting] = useState(false);

    const handleSelectionChanged = (group) => {
        setEnableVoting(group.length <= 7 && group.length > 0);
    }

    useEffect(() => {
        const getAll = async () => {
            const results = await getAllCandidatesAsync();

            setCandidates(results);
        }

        getAll();
    }, []);

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