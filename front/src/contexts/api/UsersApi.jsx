import sendRequest from '../../services/axiosRequestFunction';

const UsersApi = {
    addUser: async function (credentials) {
        return sendRequest('/api/users', 'POST', credentials, false, null,  "application/ld+json");
    },
};

export default UsersApi;