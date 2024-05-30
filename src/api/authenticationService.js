import dommusApi from "./dommusApi";

class AuthenticationService {
    async login(data) {
        try {
            const response = await dommusApi.post(`login/`, data);
            return response;
        } catch (error) {
            return null;
        }
    }

    async register(data) {
        try {
            const newUser = {
                email: data.email,
                password: data.password,
                names: data.names,
                lastnames: data.lastnames,
                birth_date: data.birth_date,
                district_id: data.district.id,
                degree_id: data.degree.id,
                genre: data.genre,
                description: data.description,
                budget_min: data.min_budget,
                budget_max: data.max_budget,
                habits: data.habits,
                phone: data.phone
            };
            const response = await dommusApi.post(`register/`, newUser);
            return response;
        } catch (error) {
            return error;
        }
    }

}

export default new AuthenticationService();
