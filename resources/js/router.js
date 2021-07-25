import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "./components/Login";
import Board from "./Board";
import Register from "./components/Register";

Vue.use(VueRouter)

const routes = [
    { path: '/login', component: Login, name:'login' },
    { path: '/register', component: Register, name:'register' },
    { path: '/board/:id', component: Board, name:'board' }
]

export default new VueRouter({
    routes, // short for `routes: routes`
    mode:'history'
})


