import http from "../http_common";

const saveSearch = (data) => {
    return http.post(`/search`, data);
};

const getHistory = () => {
    return http.get('/history');
};

const clearHistory = () => {
    return http.delete(`/delete-history`);
};

export default {
    saveSearch,
    getHistory,
    clearHistory
};
