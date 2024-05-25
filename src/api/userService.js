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

    async editUser(data, userId) {
        try {
            const response = await dommusApi.patch(`users/${userId}`, data);
            return response;
        } catch (error) {
            return null;
        }
    }

}

export default new UserService();
