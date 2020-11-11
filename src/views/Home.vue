<template>
  <b-container>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label-size="sm"
        label="Thing ID:"
        label-for="thing-id"
      >
        <b-form-input
          id="thing-id"
          size="sm"
          v-model="form.thingId"
          type="number"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      show: true,
      form: {
        thingId: '',
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.form.thingId > 0 && this.form.thingId != '') {
        this.$router.push({
          name: 'Thingiverse',
          params: { id: this.form.thingId },
        });
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.thingId = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
