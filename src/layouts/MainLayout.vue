<template>
  <q-layout class="fit" style="min-height: auto" view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn @click="toggleDrawers('left')" aria-label="Menu" dense flat icon="menu" round />

        <q-toolbar-title class="text-bold text-blue-2">
          <!-- <small class="block"> style="font-size:4vw;"-->
          <span class="text-white">&lt;q-home &nbsp;</span>
          <span v-if="!isDesktop">
            <br />v-if="Needs a Home"&gt; &nbsp; 🤔
          </span>
          <span v-else>v-if="Needs a Home"&gt; &nbsp; 🤔</span>

          <!-- <small v-if="!$q.platform.is.mobile">Physical homes for passionate coders.</small> -->
          <!-- </small> -->
        </q-toolbar-title>

        <div v-if="$route.path == '/map'">
          <q-btn
            :color="rightDrawerOpen ? 'negative' : 'secondary'"
            :icon="rightDrawerOpen ? 'settings_ethernet' : 'settings'"
            @click="toggleDrawers('right')"
            round />
        </div>
        <div v-else>
          <small class="text-capitalize absolute-top-right q-mr-sm">{{ $route.path.replace('/','') }}</small>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      :breakpoint="3000"
      :width="230"
      bordered
      content-class="bg-blue-1"
      overlay
      show-if-above
      side="left"
      v-model="leftDrawerOpen">
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list>
          <EssentialLink :key="link.title" v-bind="link" v-for="link in essentialLinks" />
        </q-list>
      </q-scroll-area>
      <login class="absolute-top" style="height: 150px; z-index:10"></login>
    </q-drawer>

    <q-drawer
      :breakpoint="500"
      :mini-width="80"
      behavior="desktop"
      bordered
      content-class="bg-blue-1"
      id="rightDrawer"
      mini
      no-swipe-open
      overlay
      side="right"
      v-model="rightDrawerOpen">
      <q-list>
        <q-item>
          <q-btn
            :color="$q.fullscreen.isActive ? 'negative' : 'secondary'"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()"
            class="q-ma-md"
            round />
        </q-item>
        <q-item>
          <q-btn
            :color="isSearch ? 'negative' : 'secondary'"
            :icon="isSearch ? 'search' : 'search'"
            @click="isSearch = !isSearch"
            class="q-ma-md"
            round />
        </q-item>
        <!-- <q-option-group :options="searchRadioOptions" @input="setSearchType" label="Geo Search Types" type="radio" v-if="isSearch" v-model="searchRadioOption" /> -->
      </q-list>
    </q-drawer>

    <!-- <q-page-container class="bg-white" style="height: calc(100% - 50px)"> -->
    <q-page-container class="bg-white fitAbsolute">
      <router-view style="min-height: auto" />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";
import Login from "components/Login";

import { mapFields } from "vuex-map-fields";

export default {
  name: "MainLayout",

  components: {
    EssentialLink,
    Login
  },

  data() {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      miniState: true,
      essentialLinks: [
        {
          title: "Home",
          icon: "home",
          link: "/"
        },
        {
          title: "About Us",
          icon: "people_outline",
          link: "/about"
        },
        {
          title: "Contact Us",
          icon: "contact_mail",
          link: "/contact"
        },
        {
          title: "Login",
          icon: "lock_open",
          link: "/login"
        },
        {
          title: "Map",
          icon: "map",
          link: "/map"
        },
        {
          title: "Photos",
          icon: "insert_photo",
          link: "/photos"
        },
        {
          title: "Settings",
          icon: "settings",
          link: "/settings"
        },
        {
          title: "Video",
          icon: "video_library",
          link: "/videos"
        }
      ],
      searchRadioOption: null,
      searchRadioOptions: [
        { label: "Address", size: "xs", value: "address" },
        { label: "Place", size: "xs", value: "place" },
        { label: "P.O.I.", size: "xs", value: "poi" }
      ]
    };
  },
  computed: {
    ...mapFields("mb_store", [
      "isLocationQuery",
      "getLocationQuery",
      "accessToken",
      "country",
      "countryCode",
      "region",
      "district",
      "place",
      "placeId",
      "iso_3166_2",
      "searchDataType"
    ]),
    ...mapFields("settings", ["isDesktop", "isSearch"])
  },
  watch: {},
  mounted() {
    if (this.$q.platform.is.desktop) {
      this.isDesktop = true;
    } else if (this.$q.platform.is.mobile) {
      this.isDesktop = false;
    }

    this.searchRadioOption = this.searchDataType;
    this.rightDrawerOpen = false;
    window.scrollTo(0, 1);
  },
  methods: {
    // getLocationAtCenter() {
    //   console.log("getLocationAtCenter called");
    //   this.isLocationQuery = !this.isLocationQuery;
    //   this.getLocationQuery = true;
    // },
    // setSearchType(type) {
    //   console.log("Search Type: ", type);
    //   this.searchDataType = type;
    //   this.$geoCoder.setTypes({ types: type, countries: this.countryCode });
    // },
    // showLocationAtCenter() {
    //   console.log("showLocationAtCenter called");
    //   this.isLocationQuery = !this.isLocationQuery;
    // },
    toggleDrawers(side) {
      console.log("toggle drawers called");
      if (side == "left") {
        this.leftDrawerOpen = !this.leftDrawerOpen;
        this.rightDrawerOpen = false;
      } else if (side == "right") {
        this.rightDrawerOpen = !this.rightDrawerOpen;
        this.leftDrawerOpen = false;
      }
    }
  }
};
</script>
<style>
#rightDrawer .q-drawer {
  bottom: auto;
}
</style>
