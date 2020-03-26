<template>
  <q-page class="fit">
    <q-carousel animated class="fit absolute" infinite swipeable thumbnails v-model="slide">
      <q-carousel-slide :name="1" draggable="false" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-carousel-slide :name="2" draggable="false" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" draggable="false" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" draggable="false" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
    </q-carousel>
  </q-page>
</template>

<script>
export default {
  name: "Photos",
  data() {
    return {
      slide: 1
    };
  }
};
</script>
