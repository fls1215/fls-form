import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dicts:{
        genderArr:[
            {value:"00900",label:"Man"},
            {value:"00901",label:"Women"},
        ],
        addrArr:[
            {value:"Shenzhen",label:"Shenzhen"},
            {value:"Guangzhou",label:"Guangzhou"},
            {value:"Shanghai",label:"Shanghai"},
        ]
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
