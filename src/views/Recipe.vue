<template>
  <v-container class="px-0 mx-auto" style="max-width: 960px">
    <v-layout class="my-2 mx-auto" row>
      <v-flex xs12>
        <v-layout style="height: 85vh" fill-height align-center justify-center row v-if="loader">
          <v-progress-circular :size="70" :width="7" color="yellow accent-4" indeterminate></v-progress-circular>
        </v-layout>
        <v-card v-show="cardRecipe">
          <v-img @load="imgLoaded" :aspect-ratio="16/9" :src="recipe.img"></v-img>
          <v-card-title class="yellow accent-4">
            <v-layout align-center justify-center row fill-height>
              <h1 class="headline font-weight-bold">{{recipe.name}}</h1>
            </v-layout>
          </v-card-title>

          <v-card-text>
            <p class="mb-2">
              <span class="font-weight-bold">Czas przygotowania:</span>
              {{recipe.prepTime}}
            </p>
            <p class="font-weight-bold mb-1">Składniki:</p>
            <ul class="mb-3">
              <li v-for="(ings, index) in recipe.ingredients" :key="index">{{ings}}</li>
            </ul>
            <p class="font-weight-bold mb-1">Sposób przygotowania:</p>
            <p class="mb-0" v-for="(prep, index) in recipe.preparation" :key="index">{{prep}}</p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <router-link
              to="/"
              exact
              class="v-btn v-btn--outline v-btn--depressed theme--light yellow--text text--accent-4"
            >
              <div class="v-btn__content">
                <v-icon small left>arrow_back_ios</v-icon>
                <span>Wróć do listy recept</span>
              </div>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["slug"],
  data() {
    return {
      loader: true,
      cardRecipe: false,
      recipe: {
        name: "",
        img: "",
        prepTime: "",
        ingredients: [],
        preparation: ""
      }
    };
  },
  created() {
    this.$http
      .get(this.setQuery(this.slug))
      .then(data => {
        return data.json();
      })
      .then(data => {
        if (data[0]) {
          const recipeData = data[0].acf;
          this.recipe.name = recipeData.nazwa_potrawy;
          this.recipe.img = recipeData.zdjecie_glowne_potrawy.url;
          this.recipe.prepTime =
            recipeData.szacunkowy_czas_przygotowania_potrawy;
          this.recipe.ingredients = recipeData.zestawienie_skladnikow_potrawy
            .split(";\r\n")
            .map(recipe => recipe.replace(";", ""));
          this.recipe.preparation = recipeData.sposob_przygotowania_potrawy
            .replace(/<\/?p>/g, "")
            .split("<br />\n");
        } else {
          this.loader = false;
          this.$router.push("/404");
        }
      });
  },
  methods: {
    setQuery(recipe) {
      const apiAddress = `https://wp-rest-api.mediakg.pl/wp-json/wp/v2`;
      return `${apiAddress}/przepisy?slug=${recipe}`;
    },
    imgLoaded() {
      this.loader = false;
      this.cardRecipe = true;
    }
  }
};
</script>