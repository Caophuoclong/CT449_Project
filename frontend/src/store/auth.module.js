import Service from "../services/contact.service"
const state = {
    user:{
        id: String,
        username: String,
        accessToken: String,
    },
    isLoggedIn: Boolean,

}
const mutations = {
    initAuthState(state){
        const  user = JSON.parse(localStorage.getItem('user'));
        state.user = user;
        state.isLoggedIn = !!user;
    },
    login(state, user){
        state.isLoggedIn = true;
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    },
    logut(state){
        state.isLoggedIn = false;
        state.user = {};
        localStorage.removeItem('user');
    },
    clearLogoutStatus(state){
        state.isLoggedIn = false;
        state.user = {};
        localStorage.removeItem('user');
    }
    
}

const actions = {
    async login({commit}, user){
        try{
            console.log(user);
            const {data} = await Service.signIn({username: user.username, password: user.password});
            commit('login', data);
            return data;
        }catch(e){
            console.log(e);
        }
    },
    async register({commit}, user){
        try{
            console.log(user);
            const {status} = await Service.signUp(user);
            if(status === 200){
                return {status:200, message: "Dang ky thanh cong"}
            }else{
                return {status: 400, message: "Dang ky that bai"}
            }
        }catch(e){
            console.log(e);
        }
    },
    logout({commit}){
        commit('clearLogoutStatus');
    }

}

const getters = {
    userLoggedIn(state){
        return state.isLoggedIn;
    },
    loggedInUser(state){
        return state.user;
    }

}

export const auth = {
    state,
    mutations,
    actions,
    getters
}