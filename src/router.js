import Vue from 'vue'
import Router from 'vue-router'
import RecipeList from './views/RecipeList.vue'
import Recipe from './views/Recipe.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'recipeList',
      component: RecipeList
    },
    {
      path: '/recipe:slug',
      name: 'recipe',
      component: Recipe,
    }
  ]
})
