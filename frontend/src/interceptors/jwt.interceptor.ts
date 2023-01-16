import axios from "axios";
import { API_URL_BASE } from "./../configs/routes.config";

const jwtInterceptor = axios.create({
    baseURL: API_URL_BASE,
    withCredentials: true,
});

jwtInterceptor.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            await axios
                .get("http://localhost:4000/auth/refresh_token", {
                    withCredentials: true,
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
            return axios(error.config);
        } else {
            return Promise.reject(error);
        }
    }
);

export default jwtInterceptor;
