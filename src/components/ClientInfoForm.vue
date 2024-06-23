<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="clientDataInput.name"
      label="Name"
    ></v-text-field>

    <v-text-field
      v-model="clientDataInput.surname"
      label="Surname"
    ></v-text-field>

    <v-text-field
      v-model="clientDataInput.address"
      label="Address"
    ></v-text-field>

    <v-text-field
      v-model="clientDataInput.phone_number"
      label="Phone Number"
    ></v-text-field>

    <v-btn class="me-4" type="submit">
      Submit
    </v-btn>

    <v-btn>
      Clear
    </v-btn>
  </form>

  <v-dialog v-model="dialog.show" persistent max-width="300px">
    <v-card>
      <v-card-title>{{ dialog.title }}</v-card-title>
      <v-card-text>{{ dialog.message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="closeDialog">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>

</script>
