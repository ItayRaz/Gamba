'use strict';

import userService from '../../services/user.service.js';

export default {
    state: {
        logedInUser: null,
        currUser: null,
        users: [],
        currCoords: {lat: 31.771959, lng: 35.217018}
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
        },
        currCoords(state){
            return state.currCoords;
        }
    },
    mutations: {
        setLogedUser(state, {user}) {
            state.logedInUser = user;            
        },
        setCurCoords(state, {coords}) {
            state.currCoords = coords.coords;
            console.log(state.currCoords);
        }
    },
    actions: {
        signIn(context, {user}) {
            return userService.signIn(user)
                .then(user => {
                    console.log('store got user:'. user)
                    context.commit({type: 'setLogedUser', user});
                    return user;
                })
        },
        logIn(context, {loginInfo}) {
            return userService.logIn(loginInfo)
                .then(user => context.commit({type: 'setLogedUser', user}));
        },
        logOut(context) {
            return userService.logOut()
                .then(() => context.commit({type: 'setLogedUser', user: null}))
        },
        getUser(context, {_id}) {
            return userService.get(_id);
        },
        getCurrCoords(context) {
            navigator.geolocation.getCurrentPosition((coords) => {
                context.commit({type: 'setCurCoords', coords}),
                err => err; 
            })
        }
    }
}