/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap'
import Vue from 'vue'
import Board from './Board'
import apolloProvider from "./apollo.config";
window.Vue = Vue;
import router from './router'
import store from './vuex.config'

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('board', Board);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    apolloProvider,
    router,
    store,
    beforeCreate(){
        //Improve user experience while waiting the update from BE, get data from local storage
        const isLoginStorage = localStorage.getItem('isLogin');
        // console.log(isLoginStorage)
        const isLogin = isLoginStorage ? (isLoginStorage == "true" ? true : false) : false
        store.dispatch('setLogin', isLogin)
        const currentUser = JSON.parse(localStorage.getItem('user'))
        store.dispatch('setAuthUser', currentUser)

        store.dispatch('updateCurrentLoginFromBE');
    }
});
