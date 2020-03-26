<template>
  <q-page class="fit" id="mapsSplitter">
    <div></div>
    <q-splitter
      :limits="[5, 100]"
      class="fit absolute"
      horizontal
      id="TopBottom"
      separator-class="bg-warning"
      separator-style="height: 3px"
      style="overflow:hidden"
      v-model="topBottomSplitValue">
      <template v-slot:before>
        <q-splitter
          :limits="[5, 100]"
          id="LeftRight"
          separator-class="bg-warning"
          separator-style="width: 3px"
          style="overflow:hidden"
          v-model="leftRightSplitValue">
          <template horizontal v-slot:before>
            <div class="fit">
              <MapboxMap class="fit"></MapboxMap>
            </div>
          </template>
          <template v-slot:separator>
            <q-avatar
              color="warning"
              icon="double_arrow"
              id="verticalHandle"
              rounded
              size="3em"
              style="transform: rotate(180deg) translateX(1em); opacity:0.5"
              text-color="white" />
          </template>
          <template v-slot:after>Top Right</template>
        </q-splitter>
      </template>

      <template v-slot:separator>
        <q-avatar
          color="warning"
          icon="double_arrow"
          id="horizontalHandle"
          rounded
          size="3em"
          style="transform: rotate(-90deg) translateX(1em); opacity:0.5"
          text-color="white" />
      </template>

      <template v-slot:after>
        <div class="fit">Bottom</div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import MapboxMap from "../components/MapboxMap";
import { mapFields } from "vuex-map-fields";

export default {
  name: "Maps",
  components: {
    MapboxMap
  },
  data() {
    return {
      // topBottomSplitValue: 100, // start at 50%
      // leftRightSplitValue: 100
    };
  },
  computed: {
    ...mapFields("settings", ["leftRightSplitValue", "topBottomSplitValue"])
  },
  mounted() {
    // TODO sync store with local storage
    if (this.$q.localStorage.getItem("leftRightSplitValue")) {
      this.leftRightSplitValue = this.$q.localStorage.getItem(
        "leftRightSplitValue"
      );
    }
    if (this.$q.localStorage.getItem("topBottomSplitValue")) {
      this.topBottomSplitValue = this.$q.localStorage.getItem(
        "topBottomSplitValue"
      );
    }
  },
  methods: {},
  watch: {
    leftRightSplitValue(newValue, oldValue) {
      if (newValue > 90) {
        this.leftRightSplitValue = 100;
      }
      this.$q.localStorage.set("leftRightSplitValue", this.leftRightSplitValue);
    },
    topBottomSplitValue(newValue, oldValue) {
      if (newValue > 90) {
        this.topBottomSplitValue = 100;
      }
      this.$q.localStorage.set("topBottomSplitValue", this.topBottomSplitValue);
    }
  }
};
</script>
<style scoped>
</style>