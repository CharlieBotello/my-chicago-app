/* global Vue, VueRouter, axios */

// Home component

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "This is my Home Page!"
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};
var RandomPage = {
  template: "#random-page",
  data: function() {
    return {
      message: "This is my Random Page!"
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};


// // Location components

var LocationsIndexPage = {
  template: "#locations-index-page",
  data: function() {
    return {
      locations: [],
    };
  },
  created: function() {
    axios.get("/locations")
    .then(function(response) {
      this.locations = response.data;
    }.bind(this));
  },
  methods: {},
  computed: {}
};

var LocationsShowPage = {
  template: "#locations-show-page",
  data: function() {
    return {
      location: {
        name: "",
        year: "",
        address: ""
        // location.location_story: "",
      }
    }
  },
  created: function() {
    axios.get("/locations/" + this.$route.params.id )
      .then(function(response) {
        this.location = response.data;
      }.bind(this));
  }
};

// // User Locations component

var UserLocationsIndexPage = {
  template: "#users-locations-index-page",
  data: function() {
    return {
      user_locations: [],
    };
  },
  created: function() {
    axios.get("/user_locations")
    .then(function(response) {
      this.user_locations = response.data;
    }.bind(this));
  },
  methods: {},
  computed: {}
};

var UserLocationsShowPage = {
  template: "#users-locations-show-page",
  data: function() {
    return {
      location: {
        name: "",
        year: "",
        address: "",
        start_time: "",
        end_time: ""
        // location.location_story: "",
      }
    }
  },
  created: function() {
    axios.get("user_locations/" + this.$route.params.id )
      .then(function(response) {
        this.location = response.data;
      }.bind(this));
  }
};




// // Authorization component

var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/users", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var LogoutPage = {
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};


// routes

var router = new VueRouter({
  routes: [
  { path: "/", component: HomePage },
  { path: "/random", component: RandomPage},
  { path: "/locations", component: LocationsIndexPage},
  { path : "/user_locations/", component: UserLocationsIndexPage}
  { path: "/locations/:id", component: LocationsShowPage},
  {path: "/user_locations/:id", component: UserLocationsShowPage},
  { path: '/signup', component: SignupPage},
  { path: '/login', component: LoginPage},
  { path: '/logout', component: LogoutPage}
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});





