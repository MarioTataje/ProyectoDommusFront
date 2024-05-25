import dommusApi from "./dommusApi";

class AuthenticationService {
    async register(data) {
        try {
            const response = await dommusApi.post(`login/`, data);
            return response;
        } catch (error) {
            return null;
        }
    }

    async login(data) {
        try {
            const response = await dommusApi.post(`register/`, data);
            return response;
        } catch (error) {
            return null;
        }
    }

}

export default new AuthenticationService();
