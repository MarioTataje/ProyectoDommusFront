import dommusApi from "./dommusApi";

class MatchService {
    async sendLike(senderId, receivedId) {
        try {
            const response = await dommusApi.post(`senders/${senderId}/receivers/${receivedId}/send-like/`, {});
            return response;
        } catch(error) {
            return null;
        }
    }

    async sendDislike(senderId, receivedId) {
        try {
            const response = await dommusApi.post(`senders/${senderId}/receivers/${receivedId}/send-dislike/`, {});
            return response;
        } catch(error) {
            return null;
        }
    }


    async getMatches(userId) {
        try {
            const response = await dommusApi.get(`users/${userId}/matches/`);
            return response;
        } catch (error) {
            return null;
        }
    }

    async getReceivedLikes(userId) {
        try {
            const response = await dommusApi.get(`users/${userId}/received-likes/`);
            return response;
        } catch (error) {
            return null;
        }
    }

    async getGivenLikes(userId) {
        try {
            const response = await dommusApi.get(`users/${userId}/given-likes/`);
            return response;
        } catch (error) {
            return null;
        }
    }

    async deleteMatch(matchId) {
        try {
            const response = await dommusApi.delete(`matches/${matchId}`);
            return response;
        } catch (error) {
            return null;
        }
    }
}

export default new MatchService();
