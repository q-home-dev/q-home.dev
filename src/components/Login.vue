<template>
  <div class="column justify-center items-center content-center" id="GoogleLogin">
    <q-img :src="bgImgage" class="absolute-top" style="height: 150px"></q-img>
    <div style="z-index: 10">
      <q-btn @click="googleLogin" color="accent" label="Sign in with Google" style="width: 120px; opacity:0.8" v-if="!currentUser.isLoggedIn"></q-btn>
      <div class="column justify-center items-center content-center" v-else>
        <div class="text-subtitle1 text-white">{{ currentUser.name }}</div>
        <div class="text-subtitle2 text-white q-ma-sm">{{ currentUser.email }}</div>
        <q-btn @click="googleLogout" color="negative" label="Sign Out" style="width: 120px; opacity:0.7"></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseAuth, db, provider } from "../statics/firebase.js";
import NotifyHelper from "../helpers/Notifications"; //notifyPositive, notifyNegative

export default {
  name: "Login",
  extends: NotifyHelper,
  data() {
    return {
      bgImgage: null,
      currentUser: {
        isLoggedIn: false
      },
      logs: [],
      users: []
    };
  },
  firestore: {
    users: db.collection("users")
  },
  mounted() {
    firebaseAuth.onAuthStateChanged(user => {
      try {
        // let currentRoute = this.$route.path; // TODO test with fullPath
        // let currentUser = {};
        if (user) {
          this.currentUser.email = user.email;
          this.currentUser.name = user.displayName;
          this.currentUser.photo = user.photoURL;
          this.currentUser.isLoggedIn = true;
          // console.log("this.currentUser = ", this.currentUser);
          // this.$store.commit("updateLoginStatus", this.currentUser);
          // if (currentRoute !== "/welcome") {
          //   this.$router.push("/");
          // }
          this.bgImgage = this.currentUser.photo;
        } else {
          this.setUserToNull();
          // this.$store.commit("updateLoginStatus", this.currentUser);
          // if (currentRoute !== "/welcome") {
          //   this.$router.push("/welcome");
          // }
          this.bgImgage =
            "http://www.visitcalifornia.com/now/sites/default/files/styles/article_hero/public/cn_blog_miraclemarchsnowupdate_kirkwood_supplied20160201_bg_0593.jpg";
        }
      } catch (error) {
        this.notifyNegative(error);
        this.logs.push(`Line 40: ${error}`);
      }
    });
  },
  computed: {
    // ...mapState(["isLoggedIn"])
  },
  methods: {
    setUserToNull() {
      this.currentUser = {};
      this.currentUser.isLoggedIn = false;
    },
    googleLogin() {
      // const provider = new firebaseAuth.GoogleAuthProvider();
      firebaseAuth
        .signInWithPopup(provider)
        .then(result => {
          console.log("Result from async login: ", result);
          let userObj = {};
          if (result) {
            if (result.user) {
              userObj = result.user;
            }
            let setUserData = {
              id: userObj.uid,
              name: userObj.displayName,
              image: userObj.photoURL,
              email: userObj.email,
              creationTime: userObj.metadata.creationTime,
              lastSignInTime: userObj.metadata.lastSignInTime
            };
            if (result.credential) {
              setUserData.idToken = result.credential.idToken;
              setUserData.accessToken = result.credential.accessToken;
              setUserData.providerId = result.credential.providerId;
            }
            // db_google_users.doc(setUserData.email).set(setUserData);
            this.notifyPositive("Logged In Successfully");
            this.logs.push(`Line 67: Logged In Successfully`);
            this.currentUser.email = userObj.email;
            this.currentUser.name = userObj.displayName;
            this.currentUser.photo = userObj.photoURL;
            this.currentUser.isLoggedIn = true;
            console.log(
              "this.$firestoreRefs.users: ",
              this.$firestoreRefs.users
            );
            this.$firestoreRefs.users
              .doc(setUserData.email)
              .set(setUserData)
              .then(() => {
                console.log("user updated");
              });
            // console.log("this.currentUser = ", this.currentUser);
            // this.$store.commit("updateLoginStatus", this.currentUser);
          } else {
            this.notifyNegative(result);
            this.logs.push(`Line 70: ${result}`);
            this.setUserToNull();
            // this.$store.commit("updateLoginStatus", this.currentUser);
          }
        })
        .catch(error => {
          this.notifyNegative(error.message);
          this.logs.push(`Line 75: ${error.message}`);
          this.setUserToNull();
          // this.$store.commit("updateLoginStatus", this.currentUser);
          //"Line 75: _statics_firebase_js__WEBPACK_IMPORTED_MODULE_1__.db.collection(...).set is not a function"
          // "Line 75: _statics_firebase_js__WEBPACK_IMPORTED_MODULE_1__.db.collection(...).set is not a function"
          // "Line 75: _statics_firebase_js__WEBPACK_IMPORTED_MODULE_1__.db.collection(...).set is not a function"
          // $vm.$firestoreRefs.todos.doc('test').set({key:'stuff'})
        });
    },
    googleLogout() {
      firebaseAuth
        .signOut()
        .then(() => {
          // console.log("line 80 this: ", this)
          this.notifyPositive("Logged OUT!");
          this.setUserToNull();
          // this.$store.commit("updateLoginStatus", this.currentUser);
        })
        .catch(error => {
          // console.log("line 84 this: ", this)
          // console.log("line 80 this: ", this);
          this.logs.push(`Line 84: ${error}`);
          this.notifyNegative(error);
          this.setUserToNull();
          // this.$store.commit("updateLoginStatus", this.currentUser);
        });
    }
  },
  watch: {
    // id: {
    //   // call it upon creation too
    //   immediate: true,
    //   handler(id) {
    //     this.$bind("user", users.doc(id));
    //   }
    // }
  }
};
</script>
