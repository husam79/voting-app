import axios from "axios";
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
        const response = await axios.post(url,{
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
        const response = await axios.get(url);

        if (response.status === 200) {
            return response.data;
        } else {
            return [];
        }

    }

    return { login, getAllCandidatesAsync }
} 