export const setUniversities = ( state, universities ) => {
    state.universities = universities;
}

export const setDegrees = ( state, degrees ) => {
    state.degrees = degrees;
}

export const setRegions = (state, regions) => {
    state.regions = regions;
};

export const setProvinces = (state, provinces) => {
    state.provinces = provinces;
};

export const setDistricts = (state, districts) => {
    state.districts = districts;
};

export const updatePhaseUser = (state, updatedUser) => {
    state.user = { ...state.user, ...updatedUser };
}

export const setLoading = ( state, loading ) => {
    state.loading = loading;
}

export const setError = ( state, error ) => {
    state.error = error;
}

export const setUserId = ( state, userId ) => {
    state.userId = userId;
}