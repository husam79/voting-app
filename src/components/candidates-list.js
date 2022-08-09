import { useEffect, useState } from 'react';
import CustomReactCheckbox from './custom-react-checkbox';

export default function CandidatesList({ candidates, onSelectionChanged }) {
    const [editCandidates, setEditCandidates] = useState(candidates);

    useEffect(() => {
        setEditCandidates(candidates);
    }, [candidates]);

    const handleChecked = (id, isChecked) => {
        let selectedGroup = editCandidates.filter(item => item.is_selected);

        //prevent selection more than 3 candidates, 
        //but allow to deselect any candidate.
        if(selectedGroup.length === 3 && isChecked){
            return;
        }

        let tmpCandidates = editCandidates.map(item => {
            if(item.id === id){                
                item.is_selected = isChecked;
            }

            return item;
        });

        onSelectionChanged(tmpCandidates.filter(item => item.is_selected));

        setEditCandidates(tmpCandidates);
    }

    return (
        <div style={styles.container}>
            {editCandidates.map(item =>
                <div key={item.id} style={styles.item}>
                    <CustomReactCheckbox isChecked={item.is_selected} id={item.id} onChanged={handleChecked} />
                    <span style={{ marginRight: 8, textAlign: 'right', padding: 2 }}>{item.full_name}</span>
                </div>
            )
            }
        </div>
    )
}

const styles = {
    container: {
        flexDirection: 'column',
        display: 'flex',
        height: '80vh',
        overflow: 'auto',
        borderColor: 'gray',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 8
    },
    item: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
        borderRadius: 4,
        margin: 8
    }
}