import axios from 'axios';

const intance = axios.create({
    baseURL: "http://localhost:5001/clone-d5220/us-central1/api"
});

export default intance;