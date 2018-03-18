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



// Images component
// var ImagesPage = {
//   template: "#load-images-page",
//   data: function() {
//     return {
//       location_id: 0
//     };
//   },
//   created: function() {},

//   methods: {
//     uploadFile: function(event) {
//       if (event.target.files.length > 0) {
//         var formData = new FormData();
//         formData.append("location_id", this.location_id);
//         // formData.append("image_url", this.image_url);
//         // formData.append("image_url_file_name", this.image_url_file_name);
//         formData.append("image_url_file_name", this.image_url_file_name);

//         // formData.append("title", this.title);
//         // formData.append("image_url_content_type", this.image_url_content_type);
//         // formData.append("image_url_content_type", this.image_url_content_type);


//         formData.append("image_url", event.target.files[0]);

//         axios
//           .post("/images", formData)
//           .then(function(response) {
//             console.log(response);
//             // this.title = "";
//             // this.body = "";
//             event.target.value = "";
//           }.bind(this));
//       }
//     }
//   },
//   computed: {}

// }
// // Location components

var LocationsIndexPage = {
  template: "#locations-index-page",
  data: function() {
    return {
      locations: [],
      searchName: "",
      searchYear: ""
    };
  },
  created: function() {
    axios.get("/locations")
    .then(function(response) {

      this.locations = response.data;

    }.bind(this));
  },
  methods: {
    isValid:function(location) {
      var validName = location.name
        .toLowerCase()
        .includes(this.searchName.toLowerCase());
      var validYear = location.year
        .toLowerCase()
        .includes(this.searchYear.toLowerCase());
      return validName && validYear
      // return validName 
    },
    go: function() {

      axios.get("/locations?search_name=" + this.searchName + "&search_year=" + this.searchYear).then(function(response) {

         this.locations = response.data; 

      }.bind(this));

    }
  },
  computed: {

  }
};

var LocationsShowPage = {
  template: "#locations-show-page",
  data: function() {
    return {
      myLocationID:"",
      location: {
        name: "",
        year: "",
        address: "",
        stories:[]
        // location.location_story: "",
      }
    }
  },
  created: function() {
    axios.get("/locations/" + this.$route.params.id )
      .then(function(response) {
        console.log("shomething")
        this.location = response.data;
        console.log(this.location);
      }.bind(this));
  },
  methods:{
    sendLocationId: function(locationId) {
      this.myLocationID = locationId
      console.log("doing something")
      console.log(this.myLocationID)
    }
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
      console.log(this.user_locations);
    }.bind(this));
  },
  methods: {},
  computed: {}
};


// var UserLocationsShowPage = {
//   template: "#users-locations-show-page",
//   data: function() {
//     return {
//       location: {
//         name: "",
//         year: "",
//         address: "",
//         start_time: "",
//         end_time: ""
//         // location.location_story: "",
//       }
//     }
//   },
//   created: function() {
//     axios.get("user_locations/" + this.$route.params.id )
//       .then(function(response) {
//         this.location = response.data;
//       }.bind(this));
//   }
// };

var UserLocationsNewPage = {
  template: "#users-locations-new-page",
  data: function() {
    return {
      userId: "",
      locationId: "",
      startTime: "",
      endTime: "",
      errors: []
    };
  },

  created:function() {
    console.log(LocationsShowPage.data)
  },
  methods: {
    submit: function() {
      var params = {
        user_id: this.userId,
        location_id: this.locationId,
        start_time: this.startTime,
        end_time: this.endTime

      };
      axios
        .post("/user_locations", params)
        .then(function(response) {
          router.push("/");
        })
        .catch(
          function(error) {
            if (error.response.status === 401){
              router.push("/login");
            } else if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            } else {
              router.push("/");
            }
          }.bind(this)
        );
    }
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
          console.log("going to loging")
          router.push("/");
        }.bind(this))
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

// var LogoutPage = {
//   created: function() {
//     axios.defaults.headers.common["Authorization"] = undefined;
//     localStorage.removeItem("jwt");
//     router.push("/");
//   }
// };


// routes

var router = new VueRouter({
  routes: [
  { path: "/", component: HomePage },
  // { path: "/random", component: RandomPage},
  { path: "/locations", component: LocationsIndexPage},
  { path : "/user_locations/", component: UserLocationsIndexPage},
  { path: "/user_locations/new", component: UserLocationsNewPage},
  { path: "/locations/:id", component: LocationsShowPage},
  // {path: "/user_locations/:id", component: UserLocationsShowPage},
  { path: '/signup', component: SignupPage},
  { path: '/login', component: LoginPage }
  // { path: '/logout', component: LogoutPage}
  // {path: '/images', component: ImagesPage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,

  // data:function () {
  //   return{
  //     myLocationID: "ss"
  //   }
    
  // },
  // methods:{

  // },
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});





