<template>
  <v-layout class="my-2 mx-auto" style="max-width: 960px">
    <v-card class>
      <v-img :src="recipe.img"></v-img>

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
          <li v-for="ings in recipe.ingredients" :key="ings">{{ings}}</li>
        </ul>
        <p class="font-weight-bold mb-1">Sposób przygotowania:</p>
        <p>{{recipe.preparation}}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue-grey lighten-2" outline block>Wróć do listy recept</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      recipe: {
        name: "Ciasto marchewkowe",
        img:
          "https://wp-rest-api.mediakg.pl/wp-content/uploads/2018/11/ciasto-marchewkowe-768x512.jpg",
        prepTime: "20min + 45min pieczenie",
        ingredients: [
          "2 jajka",
          "200g cukru",
          "150ml oleju roślinnego",
          "350g drobno startej marchewki",
          "30g wiórków kokosowych",
          "200g mąki",
          "1 łyżeczka proszku do pieczenia",
          "1 łyżeczka sody",
          "1 łyżeczka cynamonu"
        ],
        preparation:
          "Delikatnie ubić oba jajka. Dodać cukier i dalej ubijać aż masa będzie gładka i puszysta. Wciąż ubijając na wysokich obrotach, dolewać ciągłym, cieniutkim strumieniem olej. Do powstałej masy dodać marchewkę i wiórki kokosowe i delikatnie wymieszać. Do osobnej miski przesiać mąkę wraz z proszkiem do pieczenia, sodą oraz cynamonem i wymieszać. Przesypać do miski z marchewką i delikatnie połączyć wszystkie składniki. Ciasto wylać do formy wyłożonej papierem do pieczenia. Piec w temperaturze 180C przez około 45min."
      }
    };
  }
};
</script>