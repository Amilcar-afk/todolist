import sendRequest from '../../services/axiosRequestFunction';

const AuthApi = {
    login: async function (credentials) {
        return sendRequest('/auth', 'POST', credentials, false, null,  "application/ld+json");
    },

    /*logout: async function () {
        return sendRequest('/logout', 'POST', {}, true);
    },*/
};

export default AuthApi;