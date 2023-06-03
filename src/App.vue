<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="start" style="height: 150px;">
          <v-col>
            <v-img height="150" src="@/assets/logo_loot_tavern.93dd5ad5.webp"/>
          </v-col>
          <v-col>
            <h1>Loot Tavern Crafting Price Calculator</h1> by Silenc42
          </v-col>
          <v-col>
            <v-img height="150" src="@/assets/logo_loot_tavern.93dd5ad5.webp"/>
          </v-col>
        </v-row>
        <v-row>
          <Manufacture/>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Manufacture from "@/components/Manufacture.vue";
</script>
