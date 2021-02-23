import Vue from "vue"
import VueRouter from "vue-router"
import form from "../components/f-form/dynamicForm.vue"

Vue.use(VueRouter)

const routes = [
    {
        path:"/",
        name:"form",
        component:form
    },
    {
        path:"/rich",
        name:'rich',
        component:()=> import(/* webpackChunkName:"form"*/'../components/f-richtext/richtext.vue')
    },
    {
        path:"/table",
        name:'table',
        component:()=> import(/* webpackChunkName:"form"*/'../components/f-table/demo.vue')
    }
]

const router = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes
})
export default router