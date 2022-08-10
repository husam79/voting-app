import axios from "axios";
const API_ENDPOINT = 'https://vt-api.azurewebsites.net/api';

axios.defaults.withCredentials = true;

export default function dataStore() {

    const login = async (username, password) => {
        const url = API_ENDPOINT + '/voters/login'
        /* const response = await fetch(url, {
            method: 'POST',
            
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                username,
                password
            })
        }) */
        const response = await axios.post(url, {
            username,
            password
        });

        return (response.status === 200);
    }

    const getAllCandidatesAsync = async () => {
        const url = API_ENDPOINT + '/candidates'
        /* const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });
 */
        try {
            const response = await axios.get(url);

            if (response.status === 200) {
                return response.data;
            } else {
                return [];
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    const voteAsync = async (selected_candidates) => {
        const url = API_ENDPOINT + '/voting/vote'
        
        try {
            const response = await axios.post(url, {
                selected_candidates: selected_candidates
            });

            if (response.status === 201) {
                return true;
            } else {
                return false;
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    return { login, getAllCandidatesAsync, voteAsync }
} 