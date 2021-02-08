import Vue from "vue"
import VueRouter from "vue-router"
import table from "../components/f-table/demo.vue"

Vue.use(VueRouter)

const routes = [
    {
        path:"/",
        name:"table",
        component:table
    },
    {
        path:"/form",
        name:'form',
        component:()=> import(/* webpackChunkName:"form"*/'../components/f-form/dynamicForm.vue')
    }
]

const router = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes
})
export default router