import StudiesService from '@/api/studiesService';
import LocationsService from '@/api/locationsService';
import AuthenticationService from '@/api/authenticationService';
import PersonalityService from '@/api/personalityService';
import { jwtDecode } from 'jwt-decode';

export const getUniversities = async({ commit }) => {
    commit('setLoading', true);
    try {
        const response = await StudiesService.getUniversities();
        commit('setUniversities', response.data);
    } catch (error) {
        commit('setError', error.message || 'Error al obtener las universidades');
    } finally {
        commit('setLoading', false);
    }
}

export const getDegrees = async({ commit }, universityId ) => {
    commit('setLoading', true);
    try {
        const response = await StudiesService.getDegrees(universityId);
        commit('setDegrees', response.data);
    } catch (error) {
        commit('setError', error.message || 'Error al obtener las carreras');
    } finally {
        commit('setLoading', false);
    }
}

export const getRegions = async ({ commit }) => {
    commit('setLoading', true);
    try {
        const response = await LocationsService.getRegions();
        commit('setRegions', response.data);
    } catch (error) {
        commit('setError', error.message || 'Error al obtener las regiones');
    } finally {
        commit('setLoading', false);
    }
};

export const getProvinces = async ({ commit }, regionId) => {
    commit('setLoading', true);
    try {
        const response = await LocationsService.getProvinces(regionId);
        commit('setProvinces', response.data);
    } catch (error) {
        commit('setError', error.message || 'Error al obtener las provincias');
    } finally {
        commit('setLoading', false);
    }
};

export const getDistricts = async ({ commit }, provinceId) => {
    commit('setLoading', true);
    try {
        const response = await LocationsService.getDistricts(provinceId);
        commit('setDistricts', response.data);
    } catch (error) {
        commit('setError', error.message || 'Error al obtener los distritos');
    } finally {
        commit('setLoading', false);
    }
};

export const updatePhaseUser = async ({ commit }, updatePhaseUser) => {
    commit('updatePhaseUser', updatePhaseUser);
}

export const createUser = async ({ commit }, user ) => {
    commit('setLoading', true);
    try {
        const response = await AuthenticationService.register(user);
        console.log(response);
        const { data, error } = response;
        if (data) {
            await PersonalityService.createSelfPersonality(user.self_personality, data.id);
        }
        if (error) {
            console.log(error);
        }
    } catch (error) {
        commit('setError', error.message || 'Error al al crear el usuario');
    } finally {
        commit('setLoading', false);
    }
}

export const loginUser = async ({ commit }, user ) => {
    commit('setLoading', true);
    try {
        const response = await AuthenticationService.login(user);
        const { data } = response;
        if (data) {
            const { access } = data;
            if (access){
                sessionStorage.setItem('token', access);
                const { user_id } = jwtDecode(access);
                commit('setUserId', user_id);
            }
        }
    } catch (error) {
        commit('setError', error.message || 'Error al al crear el usuario');
    } finally {
        commit('setLoading', false);
    }
}
