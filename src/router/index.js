import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

var home = require("../pages/home.vue")


var routes = [
	{path:"/",component:home},
];

Vue.use(Router)
Vue.use(VueResource);

export default new Router({
  routes
})
