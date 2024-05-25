import dommusApi from "./dommusApi";

class LocationsService {
    async getRegions() {
        try {
            const response = await dommusApi.get(`regions/`);
            return response;
        } catch (error) {
            return null;
        }
    }

    async getProvinces(regionId) {
        try {
            const response = await dommusApi.get(`regions/${regionId}/provinces/`);
            return response;
        } catch (error) {
            return null;
        }
    }

    async getDistricts(provinceId) {
        try {
            const response = await dommusApi.get(`provinces/${provinceId}/districts/`);
            return response;
        } catch (error) {
            return null;
        }
    }
}

export default new LocationsService();
