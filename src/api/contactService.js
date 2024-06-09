import dommusApi from "./dommusApi";

class ContactService {

    async getContacts(userId) {
        try {
            const response = await dommusApi.get(`users/${userId}/contacts`);
            return response;
        } catch (error) {
            return null;
        }
    }

}

export default new ContactService();
