import { useEffect, useState } from 'react';
import CustomReactCheckbox from './custom-react-checkbox';
import MsgBox from './msgbox';

export default function CandidatesList({ candidates, onSelectionChanged }) {
    const [editCandidates, setEditCandidates] = useState(candidates);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        setEditCandidates(candidates);
    }, [candidates]);

    const handleChecked = (id, isChecked) => {
        let selectedGroup = editCandidates.filter(item => item.is_selected);

        //prevent to select more than 7 candidates, 
        //but allow to deselect any candidate.
        if (selectedGroup.length === 7 && isChecked) {
            setModalShow(true);
            return;
        }

        let tmpCandidates = editCandidates.map(item => {
            if (item.id === id) {
                item.is_selected = isChecked;
            }

            return item;
        });

        onSelectionChanged(tmpCandidates.filter(item => item.is_selected));

        setEditCandidates(tmpCandidates);
    }

    return (
        <div style={styles.container}>
            <MsgBox
                title='إختيار مرشّح'
                body='لا يمكن اختيار أكثر من 7 مرشحين'
                type='close'
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
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
        height: '70vh',
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