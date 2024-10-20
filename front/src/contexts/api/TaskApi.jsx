import sendRequest from '../../services/axiosRequestFunction';

const taskUrl = 'api/tasks';

const TaskApi = {
    addTask: async function (task) {
        return sendRequest(taskUrl, 'POST', task, true, null,  "application/ld+json");
    },
    updateTask: async function (id) {
        return sendRequest(taskUrl +`/${id}`, 'PATCH', {}, true, null,  "application/ld+json");
    },
    deleteTask: async function (id) {
        return sendRequest(taskUrl +`/${id}`, 'DELETE', {}, true, null,  "application/ld+json");
    },
    /*getUserTask: async function (id) {
        return sendRequest(taskUrl +`/${id}`, 'PATCH', {}, true, null,  "application/ld+json");
    },*/
};

export default TaskApi;