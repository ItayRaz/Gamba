'use strict';

import userService from '../../services/user.service.js';

export default {
    state: {
        logedInUser: null,
        currUser: null,
        users: [],
        currCoords: {}
    },
    getters: {
        logedInUser(state) {
            return state.logedInUser;
        },
        currUser(state) {
            return state.currUser;
        },
        users(state) {
            return state.users;
        }
    },
    mutations: {
        setLogedUser(state, {user}) {
            state.logedInUser = user;            
        },
        setCurCoords(state, {coords}) {
            state.currCoords = coords;
            console.log(state.currCoords);

        }
    },
    actions: {
        logIn(context, {loginInfo}) {
            return userService.logIn(loginInfo)
                .then(user => context.commit({type: 'setLogedUser', user}));
        },
        logOut(context) {
            return userService.logOut()
                .then(() => context.commit({type: 'setLogedUser', user: null}))
        },
        getCurrCoords(context) {
            navigator.geolocation.getCurrentPosition((coords) => {
                context.commit({type: 'setCurCoords', coords}),
                err => err; 
            })
        }
    }
}