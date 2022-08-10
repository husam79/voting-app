//import { useEffect, useState } from "react"


export default function CustomReactCheckbox({ isChecked, onChanged, id }) {
    //const [state, setState] = useState(isChecked);

   /*  useEffect(() => {
        setState(isChecked)
    }, isChecked); */

    const handleOnClick = () => {
        //setState(!state);

        if (onChanged) {
            onChanged(id, !isChecked)
        }
    }

    let currentStyle = isChecked ? styles.checked : styles.unchecked;

    return (
        <div style={styles.container}>
            <div style={{ ...styles.common, ...currentStyle }} onClick={handleOnClick}>

            </div>
        </div>
    )
}

const styles = {
    container: {
        padding: 2,

    },
    common: {
        borderRadius: 10,
        width: 20,
        height: 20,
    },
    checked: {
        backgroundColor: '#0af'
    },
    unchecked: {
        backgroundColor: '#ededed'
    }
}