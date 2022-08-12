import axios from "axios";
//const API_ENDPOINT = 'https://vt-api.azurewebsites.net/api';
const API_ENDPOINT = 'http://localhost:3010/api';

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
        const { data } = await axios.post(url, {
            username,
            password
        });

        return data;
    }

    const logout = async () => {
        await axios.post(`${API_ENDPOINT}/voters/logout`);
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
            console.log(err.message)
        }
    }

    const voteAsync = async (selected_candidates) => {
        const url = API_ENDPOINT + '/voting/vote'

        const selected_ids = selected_candidates.map(item => item.id)

        try {
            const response = await axios.post(url, {
                selected_candidates: selected_ids
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

    const getSelectedCandidatesAsync = async () => {
        const { data } = await axios.get(`${API_ENDPOINT}/candidates/of-voter`);

        return data.map(({ voting_date, ...candidate }) => ({
            ...candidate,
            voting_date: new Date(voting_date)
        }));
    }

    const getCandidatesResultAsync = async () => {
        const { data } = await axios.get(`${API_ENDPOINT}/candidates/results`);

        return data;
    }

    return {
        login,
        logout,
        getAllCandidatesAsync,
        voteAsync,
        getSelectedCandidatesAsync,
        getCandidatesResultAsync
    }
} 