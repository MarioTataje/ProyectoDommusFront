import dommusApi from "./dommusApi";

class ReportService {
    async createReport(reportingId, reportedId, data) {
        try {
            const response = await dommusApi.post(`reporting/${reportingId}/reported/${reportedId}/reports/`, data);
            return response;
        } catch(error) {
            return null;
        }
    }

    async getReporting(reportingId) {
        try {
            const response = await dommusApi.get(`reporting/${reportingId}/reports/`);
            return response;
        } catch (error) {
            return null;
        }
    }

    async getReported(reportedId) {
        try {
            const response = await dommusApi.get(`reported/${reportedId}/reports/`);
            return response;
        } catch (error) {
            return null;
        }
    }

}

export default new ReportService();
