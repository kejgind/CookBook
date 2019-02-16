<template>
  <v-container class="px-0 mx-auto" style="max-width: 960px">
    <v-layout class="my-2 mx-auto" row>
      <v-flex xs12>
        <h1 class="headline font-weight-bold mb-3">Nie ma takiego przepisu.</h1>
        <p
          class="font-weight-bold mb-3"
        >Szukany przepis nie został znaleziony, aby wrócić na stronę główną kliknij poniższy przycisk.</p>
        <router-link
          to="/"
          exact
          class="v-btn v-btn--outline v-btn--depressed theme--light yellow--text text--accent-4"
        >CookBook</router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "errorPage"
};
</script>