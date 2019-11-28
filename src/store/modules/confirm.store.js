'use strice';

export default {
    state: {
        msg: '',
        resolve: null,
        reject: null,
        isConfirm: false
    },
    getters: {
        alertMsg(state) {
            return state.msg;
        },
        confirmResolve(state) {
            return state.resolve;
        },
        confirmReject(state) {
            return state.reject;
        },
        isConfirm(state) {
            return state.isConfirm;
        }
    },
    mutations: {
        setConfirm(state, {resolve, reject, msg}) {
            state.isConfirm = true;
            state.resolve = resolve;
            state.reject = reject;
            state.msg = msg;
        },
        setAlert(state, {msg}) {
            state.msg = msg;
        },
        resetAlert(state) {
            state.resolve = null;
            state.reject = null;
            state.msg = null;
            state.isConfirm = false;
        }
    },
    actions: {
        Confirm(context, {msg}) {
            return new Promise((resolve, reject) => {
                context.commit({type: 'setConfirm', resolve, reject, msg});
            })
        },
        Alert(context, {msg}) {
            context.commit({type: 'setAlert', msg})
        },
    }
}