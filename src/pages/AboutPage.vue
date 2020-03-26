<template>
  <q-page class="fit" ref="aboutPage" id="aboutPage">
    <q-scroll-area :bar-style="barStyle" :thumb-style="thumbStyle" class="fit" horizontal ref="oldNewsPaper">
      <!-- height="1001" width="1500" height="1001" width="1334"       style="position: absolute" :delay="2000" -->
      <div class="row full-height no-wrap" ref="imagesDiv">
        <img alt="Car Pool Connections circa 1990" class="full-height" src="/statics/images/SunHearldAdWeb.png" />
        <img
          alt="James & Mary Swansburg, summer 2019"
          class="full-height"
          src="/statics/images/JamesMary2019-1001h.jpg" />
      </div>
    </q-scroll-area>
    <div
      class="absolute-bottom-left q-ma-xl q-pa-md shadow-2 rounded-borders"
      id="aboutText"
      style="width: 60%; height: 60%; resize: horizontal; background-color: rgba(255,255,255,0.9); overflow: auto">
      <h4 class="q-ma-xs">30 Years Ago...</h4>
      <p>
        In 1990, I started, or attempted to start, a computerized ride sharing service. It, unfortunately, failed. Software was very hard back then.
        Things have changed and it is an exciting time to create solutions which may actually "Change the World". Now I have discovered "Quasar", "Firebase", "Mapbox", "Electron", "VS Code", this list goes on. Awesome tools!
      </p>
      <h4 class="q-ma-xs">Now...</h4>
      <p>
        At 60+ years old. I have more ideas than ever. And this web site is just one of them. On March 11 of this year (2020), the
        <a
          href="https://www.who.int/dg/speeches/detail/who-director-general-s-opening-remarks-at-the-media-briefing-on-covid-19---11-march-2020"
          target="_blank">WHO</a> declared a global pandemic. The ripple effect is beyond my imagination, but I know there are things we can do to help.
        my first step is to open my home, which has operated as a lakefront B&B resort for the last 25 years, to developers who can help.
        The exact details of how this will work out has yet to be determined. But the concept is that we have lots of room, high speed Internet, clean water,
        and a very healthy environment. Contact us if you have
        <em>positive</em> suggestions on how to best move forward.
      </p>
      <p>
        <a href="mailto:qhome.dev@gmail.com">James & Mary Swansburg</a>
      </p>
      <p>
        Currently, only our property on
        <a
          href="https://www.wasalakeresort.com/"
          target="_blank">Wasa Lake, in British Columbia, Canada</a> is on the Map Page. Hopefully, more people can offer their properties to become software
        development hubs, away from the cities and close to nature. Please contact us to help build this concept.
      </p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2
      },
      scrollPosition: null,
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
        marginBottom: "10px",
        height: "14px"
      }
    };
  },
  mounted() {
    // console.log("this.$refs.image.width: ", this.$refs.image.width);
    // console.log(
    //   "this.$refs.oldNewsPaper.containerWidth: ",
    //   this.$refs.oldNewsPaper.containerWidth
    // );
    // let ratio = this.$refs.oldNewsPaper.containerHeight / 1001;
    // let ratioWidth = ratio * 2834;
    // this.$refs.imagesDiv.style.width = ratioWidth - 20 + "px";
    // this.scrollPosition = 2506 - this.$refs.oldNewsPaper.containerWidth;
    // this.$refs.oldNewsPaper.setScrollPosition(this.scrollPosition, 4000);
    // this.$refs.aboutPage.$el.addEventListener("mousedown", this.cancelScroll, true);
    setTimeout(() => {this.scrollHandler()}, 500)
  },
  methods: {
    cancelScroll(e){
      // HACK TO STOP EVENT
      // console.log("cancelScroll e:", e);
      // let stopAt = this.$refs.oldNewsPaper.getScrollPosition() + 20;
      // this.$refs.oldNewsPaper.setScrollPosition(stopAt);
      // this.$refs.aboutPage.$el.removeEventListener("mousedown", this.cancelScroll, true);
    },
    scrollHandler() {
      this.scrollPosition =
        this.$refs.oldNewsPaper.getScrollTarget().scrollWidth -
        this.$refs.oldNewsPaper.containerWidth;

      console.log("this.scrollPosition: ", this.scrollPosition);
      this.$refs.oldNewsPaper.setScrollPosition(this.scrollPosition, 5000);
    }
  }
};
</script>
<style scoped>
/* #aboutText:focus-within {
  background-color: rgba(255, 255, 255, 0.9);
} */
/* .div.q-scrollarea__thumb {
  margin-bottom: 12px;
} */
</style>
