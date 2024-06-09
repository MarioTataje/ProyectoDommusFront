import dommusApi from "./dommusApi";

class StudiesService {
    async getUniversities() {
        try {
            const response = await dommusApi.get(`universities/`);
            return response;
        } catch (error) {
            return null;
        }
    }

    async getDegrees(universityId) {
        try {
            const response = await dommusApi.get(`universities/${universityId}/degrees/`);
            return response;
        } catch (error) {
            return null;
        }
    }
}

export default new StudiesService();
