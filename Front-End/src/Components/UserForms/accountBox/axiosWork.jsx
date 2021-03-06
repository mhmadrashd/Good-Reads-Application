
import axios from 'axios';

export default axios.create({
    baseURL: 'https://goodread-backend.herokuapp.com'
}, {
    headers: {
        token: sessionStorage.getItem("Authorization")
    }
});