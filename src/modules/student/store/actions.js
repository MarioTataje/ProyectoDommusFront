import UserService from '@/api/userService';
import IdealProfileService from '@/api/idealProfileService';
import MatchService from '@/api/matchService';
import ContactService from '@/api/contactService';

export const getProfiles = async({ commit }, payload ) => {
    commit('setLoading', true);
    try {
        const { data, userId } = payload;
        const response = await IdealProfileService.getIdealRoomates(data, userId);
        commit('setProfiles', response.data);
    } catch (error) {
        commit('setError', error.message || 'Error al obtener los perfiles');
    } finally {
        commit('setLoading', false);
    }
}

export const getMatches = async({ commit }, userId ) => {
    commit('setLoading', true);
    try {
        const response = await MatchService.getMatches(userId);
        commit('setMatches', response.data);
    } catch (error) {
        commit('setError', error.message || 'Error al obtener los matches');
    } finally {
        commit('setLoading', false);
    }
}

export const getReceivedLikes = async({ commit }, userId ) => {
    commit('setLoading', true);
    try {
        const response = await MatchService.getReceivedLikes(userId);
        commit('setReceivedLikes', response.data);
    } catch (error) {
        commit('setError', error.message || 'Error al obtener los likes');
    } finally {
        commit('setLoading', false);
    }
}

export const getUserProfile = async({ commit }, userId ) => {
    commit('setLoading', true);
    try {
        const response = await UserService.getUser(userId);
        commit('setProfile', response.data);
    } catch (error) {
        commit('setError', error.message || 'Error al obtener el perfil');
    } finally {
        commit('setLoading', false);
    }
}


export const sendLike = async({ commit }, data ) => {
    commit('setLoading', true);
    try {
        const { senderId, receivedId } = data;
        const response = await MatchService.sendLike(senderId, receivedId);
        return response.data;
    } catch (error) {
        commit('setError', error.message || 'Error al enviar el dislike');
    } finally {
        commit('setLoading', false);
    }
}

export const sendDislike = async({ commit }, data ) => {
    commit('setLoading', true);
    try {
        const { senderId, receivedId } = data;
        await MatchService.sendDislike(senderId, receivedId);
    } catch (error) {
        commit('setError', error.message || 'Error al enviar el dislike');
    } finally {
        commit('setLoading', false);
    }
}

export const getContacts = async({ commit }, userId ) => {
    commit('setLoading', true);
    try {
        const response = await ContactService.getContacts(userId);
        commit('setContacts', response.data);
    } catch (error) {
        commit('setError', error.message || 'Error al obtener los matches');
    } finally {
        commit('setLoading', false);
    }
}

export const updatePlan = async({ commit }, payload ) => {
    commit('setLoading', true);
    try {
        const { userId, data } = payload;
        const response = await UserService.updatePlan(data, userId);
        return response.data;
    } catch (error) {
        commit('setError', error.message || 'Error al actualizar plan');
    } finally {
        commit('setLoading', false);
    }
}
