import sendRequest from '../../services/axiosRequestFunction';

const taskUrl = 'api/tasks';

const TaskApi = {
    addTask: async function (task) {
        return sendRequest(taskUrl, 'POST', task, true, null,  "application/ld+json");
    },
    updateTask: async function (id, data) {
        console.log(data);
        return sendRequest(taskUrl +`/${id}`, 'PATCH', data, true, null,  "application/merge-patch+json");
    },
    deleteTask: async function (id) {
        return sendRequest(taskUrl +`/${id}`, 'DELETE', {}, true, null,  "application/ld+json");
    },
    getTasks: async function () {
        return sendRequest(taskUrl + `?checked=false`, 'GET', {}, true, null,  "application/ld+json");
    },
    getTodayTasks: async function (date) {
        return sendRequest(taskUrl + `?date[after]=${date}&date[before]=${date}&checked=false`, 'GET', {}, true, null,  "application/ld+json");
    },
    getOverdueTasks: async function (date) {
        return sendRequest(taskUrl + `?date[strictly_before]=${date}&checked=false`, 'GET', {}, true, null,  "application/ld+json");
    },
    getTodayCheckedTasks: async function (date) {
        return sendRequest(taskUrl + `?date[after]=${date}&date[before]=${date}&checked=true`, 'GET', {}, true, null,  "application/ld+json");
    },
    /*getUserTask: async function (id) {
        return sendRequest(taskUrl +`/${id}`, 'PATCH', {}, true, null,  "application/ld+json");
    },*/
};

export default TaskApi;