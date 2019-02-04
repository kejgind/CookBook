<template>
  <div>
    <v-container grid-list-xs fluid class="px-0 pb-0 my-0 mx-auto" style="max-width: 960px">
      <v-layout row wrap>
        <v-flex xs12 sm6 md3>
          <v-btn small block dark @click="showAll">Wszystkie Przepisy</v-btn>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-btn small block color="teal darken-1" class="white--text" @click="showDish(19)">Dania Główne</v-btn>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-btn small block color="blue-grey darken-1" class="white--text" @click="showDish(26)">Desery</v-btn>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-btn small block color="blue darken-3" class="white--text" @click="showDish(32)">Sałatki</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid grid-list-lg class="px-0 mx-auto" style="max-width: 960px">
      <v-layout style="height: 70vh" fill-height align-center justify-center row v-if="loader">
        <v-progress-circular :size="70" :width="7" color="yellow accent-4" indeterminate></v-progress-circular>
      </v-layout>
      <v-layout row wrap v-show="recipeCards">
        <v-flex xs12 sm6 md4 v-for="recipe in recipes" :key="recipe.id" v-show="recipe.show">
          <v-card class="text-xs-center pb-3">
            <v-img @load="imgLoaded" :aspect-ratio="16/9" :src="recipe.img" alt/>
            <v-card-title class="yellow accent-4 justify-center">
              <h2 class="subheading font-weight-bold">{{shortenName(recipe.name)}}</h2>
            </v-card-title>
            <v-card-text class="text-xs-left">
              <p>
                <v-icon class="mr-2">timer</v-icon>
                {{recipe.prepTime}}
              </p>
            </v-card-text>
            <v-card-actions class="justify-center">
              <router-link
                :to="recipe.slug"
                exact
                class="v-btn v-btn--outline v-btn--depressed theme--light yellow--text text--accent-4"
              >
                <div class="v-btn__content">
                  <v-icon small left>chrome_reader_mode</v-icon>
                  <span>Zobacz przepis</span>
                </div>
              </router-link>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loader: true,
      recipeCards: false,
      recipeCounter: 0,
      queryParams: {
        perPage: 30,
        currentPage: 1,
        allPages: 1,
        dishType: null
      },
      recipes: []
    };
  },
  created() {
    this.$http
      .get(this.setQuery())
      .then(data => {
        return data.json();
      })
      .then(data => {
        data.forEach(recipe => {
          const newRecipe = {
            id: recipe.id,
            name: recipe.acf.nazwa_potrawy,
            img: recipe.acf.zdjecie_glowne_potrawy.sizes.medium_large,
            prepTime: recipe.acf.szacunkowy_czas_przygotowania_potrawy,
            slug: recipe.slug,
            dish: recipe.acf.rodzaj_dania,
            show: true
          };
          this.recipes.push(newRecipe);
        });
      });
  },
  methods: {
    setQuery() {
      const apiAddress = `https://wp-rest-api.mediakg.pl/wp-json/wp/v2`;
      return `${apiAddress}/przepisy`;
    },
    shortenName(title) {
      if (title.length < 26) {
        return title;
      } else {
        return title.substring(0, 26) + "...";
      }
    },
    showDish(dishId) {
      this.queryParams.dishType = dishId;
      return this.recipes.map(recipe => {
        recipe.show = true;
        if (!recipe.dish.includes(dishId)) {
          recipe.show = false;
        }
      });
    },
    showAll() {
      this.queryParams.dishType = null;
      return this.recipes.map(recipe => {
        recipe.show = true;
      });
    },
    imgLoaded() {
      const recipeCount = this.recipes.length;
      this.recipeCounter++;
      if (this.recipeCounter === recipeCount) {
        this.loader = false;
        this.recipeCards = true;
      }
    }
  },
};
</script>
