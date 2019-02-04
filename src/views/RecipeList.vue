<template>
  <v-container fluid grid-list-md class="px-0">
    <v-layout row wrap style="max-width: 960px" class="mx-auto">
      <v-flex xs12 sm6 md3>
        <v-btn block dark>Wszystkie Przepisy</v-btn>
      </v-flex>
      <v-flex xs12 sm6 md3>
        <v-btn block color="teal darken-1" class="white--text">Dania Główne</v-btn>
      </v-flex>
      <v-flex xs12 sm6 md3>
        <v-btn block color="blue-grey darken-1" class="white--text">Desery</v-btn>
      </v-flex>
      <v-flex xs12 sm6 md3>
        <v-btn block color="blue darken-3" class="white--text">Sałatki</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap style="max-width: 960px" class="mx-auto">
      <v-flex xs12 sm6 md4 v-for="recipe in recipes" :key="recipe.name">
        <v-card class="text-xs-center pb-3">
          <v-img :src="recipe.img" alt/>
          <v-card-title class="yellow accent-4 justify-center">
            <h2 class="headline font-weight-bold">{{recipe.name}}</h2>
          </v-card-title>
          <v-card-text class="text-xs-left">
            <p>
              <v-icon class="mr-2">timer</v-icon>
              {{recipe.prepTime}}
            </p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <router-link
              to="/recipe"
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
</template>

<script>
export default {
  data() {
    return {
      recipes: [
        {
          name: "Ciasto marchewkowe",
          img:
            "https://wp-rest-api.mediakg.pl/wp-content/uploads/2018/11/ciasto-marchewkowe-768x512.jpg",
          prepTime: "20min + 45min pieczenie"
        },
        {
          name: "Jabłecznik",
          img:
            "https://wp-rest-api.mediakg.pl/wp-content/uploads/2018/11/ciasto-marchewkowe-768x512.jpg",
          prepTime: "20min + 45min pieczenie"
        },
        {
          name: "Sernik",
          img:
            "https://wp-rest-api.mediakg.pl/wp-content/uploads/2018/11/ciasto-marchewkowe-768x512.jpg",
          prepTime: "20min + 45min pieczenie"
        },
        {
          name: "Skubaniec",
          img:
            "https://wp-rest-api.mediakg.pl/wp-content/uploads/2018/11/ciasto-marchewkowe-768x512.jpg",
          prepTime: "20min + 45min pieczenie"
        }
      ]
    };
  }
};
</script>
