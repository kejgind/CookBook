import Vue from "vue";
import Router from "vue-router";
import RecipeList from "./views/RecipeList.vue";
import Recipe from "./views/Recipe.vue";
import ErrorPage from "./views/ErrorPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "recipeList",
      component: RecipeList,
    },
    {
      path: "/404",
      name: "errorPage",
      component: ErrorPage,
    },
    {
      path: "/:slug",
      name: "recipe",
      props: true,
      component: Recipe,
    },
  ],
});
