import UserService from '@/api/userService';
import IdealProfileService from '@/api/idealProfileService';
import MatchService from '@/api/matchService';

export const getProfiles = async({ commit }, userId ) => {
    commit('setLoading', true);
    try {
        const response = await IdealProfileService.getProfiles(userId);
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
        console.log('AKI');
        const response = await UserService.getUser(userId);
        commit('setProfile', response.data);
    } catch (error) {
        commit('setError', error.message || 'Error al obtener el perfil');
    } finally {
        commit('setLoading', false);
    }
}
