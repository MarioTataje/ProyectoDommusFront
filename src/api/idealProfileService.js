import dommusApi from "./dommusApi";

class IdealProfileService {
    async getProfiles(userId) {
        try {
            const response = await dommusApi.get(`users/${userId}/profiles/`);
            return response;
        } catch (error) {
            return null;
        }
    }

    async getIdealPersonality(userId) {
        try {
            const response = await dommusApi.get(`users/${userId}/ideal-personality/`);
            return response;
        } catch (error) {
            return null;
        }
    }

    async getIdealRoomates(userId) {
        try {
            const response = await dommusApi.get(`users/${userId}/ideal-rommates/`);
            return response;
        } catch (error) {
            return null;
        }
    }

}

export default new IdealProfileService();
