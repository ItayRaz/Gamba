'use strice';

export default {
    state: {
        resolve: null,
        reject: null,
        isConfirm: false,
        msg: '',
        link: '',
        type: ''
        // msg: 'A new event was just created! check it out',
        // link: '/event',
        // type: 'Notification'
    },
    getters: {
        alertMsg(state) {
            return state.msg;
        },
        alertLink(state) {
            return state.link;
        },
        confirmResolve(state) {
            return state.resolve;
        },
        confirmReject(state) {
            return state.reject;
        },
        isConfirm(state) {
            return state.isConfirm;
        },
        alertType(state) {
            return state.type;
        }
    },
    mutations: {
        setConfirm(state, {resolve, reject, msg}) {
            state.isConfirm = true;
            state.resolve = resolve;
            state.reject = reject;
            state.msg = msg;
            state.type = 'Confirm';
        },
        setAlert(state, {msg}) {
            state.msg = msg;
            state.type = 'Alert';
        },
        resetAlert(state) {
            state.resolve = null;
            state.reject = null;
            state.msg = '';
            state.link = '';
            state.isConfirm = false;
            state.type = '';
        },
        setNotification(state, {msg, link}) {
            console.log('setting Notification', msg, link);
            state.msg = msg,
            state.link = link
            state.type = 'Notification';
        }
    },
    actions: {
        Confirm(context, {msg}) {
            return new Promise((resolve, reject) => {
                context.commit({type: 'setConfirm', resolve, reject, msg});
            })
        },
        Alert(context, {msg}) {
            context.commit({type: 'setAlert', msg});
        },
        Notification(context, {msg, link}) {
            context.commit({type: 'setNotification', msg, link});
        }
    }
}