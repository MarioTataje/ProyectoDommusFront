import dommusApi from "./dommusApi";

class UserService {
    async getUser(userId) {
        try {
            const response = await dommusApi.get(`users/${userId}`);
            return response;
        } catch (error) {
            return null;
        }
    }

    async verifyEmail(data) {
        try {
            const response = await dommusApi.post(`users/mail/`, data);
            return response;
        } catch (error) {
            if(error.response){
                return error.response;
            }
            return error;
        }
    }

    async editUser(data, userId) {
        try {
            const response = await dommusApi.patch(`users/${userId}`, data);
            return response;
        } catch (error) {
            return null;
        }
    }

    async updatePlan(data, userId) {
        try {
            const response = await dommusApi.post(`users/${userId}/plans/`, data);
            return response;
        } catch (error) {
            return null;
        }
    }

}

export default new UserService();
