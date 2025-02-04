import TheWelcome from '@/components/TheWelcome.vue'
import MessageForm from '@/components/MessageForm.vue'


import { createRouter, createWebHistory } from "vue-router"; 
import RegsterUser from '@/components/RegsterUser.vue';
import LoginUser from '@/components/LoginUser.vue';
import DashBoard from '@/components/DashBoard.vue';
// import RegsterUser from '@/components/regsterUser.vue';


const routes = [
    {
        path:'/',
        component: TheWelcome,
        name: 'Welcome'
    },
    {
        path:'/sendmsg/:id',
        component: MessageForm,
        name: 'sendmsg'
    },
    {
        path:'/register',
        component: RegsterUser,
        name: 'register'
    },
    {
        path:'/signin',
        component: LoginUser,
        name: 'signin'
    },
    {
        path:'/dashboard',
        component: DashBoard,
        name: 'dashboard'
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
})