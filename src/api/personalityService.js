import dommusApi from "./dommusApi";

class PersonalityService {
    async getSelfPersonalities(userId) {
        try {
            const response = await dommusApi.get(`users/${userId}/self-personalities/`);
            return response;
        } catch (error) {
            return null;
        }
    }

    async createSelfPersonality(data, userId) {
        try {
            const response = await dommusApi.post(`users/${userId}/self-personalities/`, data);
            return response;
        } catch (error) {
            return null;
        }
    }

    async getTargetPersonalities(userId) {
        try {
            const response = await dommusApi.get(`users/${userId}/target-personalities/`);
            return response;
        } catch (error) {
            return null;
        }
    }

    async createTargetPersonality(data, userId) {
        try {
            const response = await dommusApi.post(`users/${userId}/target-personalities/`, data);
            return response;
        } catch (error) {
            return null;
        }
    }

}

export default new PersonalityService();
