/* global Vue, VueRouter, axios */
// window.$ = window.jQuery = require("jquery");
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
  computed: {},
  mounted: function() {
    $(document).ready(function () {
      $.HSCore.components.HSCarousel.init('.js-carousel');
    });
  }
};


// var RandomPage = {
//   template: "#random-page",
//   data: function() {
//     return {
//       location: {
//         name: "",
//         year: "",
//         address: "",
//         lt: "",
//         lg: "",
//         stories:[]
//         // location.location_story: "",
//       },
//     };
//   },
//   created: function() {
//     axios.get("/locations/" + this.$route.params.id )
//       .then(function(response) {
//         this.location = response.data;
//       }.bind(this));
//   },
//   methods: {},
//   computed: {}
// };

// Images component
var ImagesPage = {
  template: "#load-images-page",
  data: function() {
    return {
      location_id: 0
    };
  },
  created: function() {},

  methods: {
    uploadFile: function(event) {
      if (event.target.files.length > 0) {
        var formData = new FormData();
        formData.append("location_id", this.location_id);
        // formData.append("image_url", this.image_url);
        // formData.append("image_url_file_name", this.image_url_file_name);
        formData.append("image_url_file_name", this.image_url_file_name);

        // formData.append("title", this.title);
        // formData.append("image_url_content_type", this.image_url_content_type);
        // formData.append("image_url_content_type", this.image_url_content_type);


        formData.append("image_urls", event.target.files[0]);

        axios
          .post("/images", formData)
          .then(function(response) {
            console.log(response);
            // this.title = "";
            // this.body = "";
            event.target.value = "";
          }.bind(this));
      }
    }
  },
  computed: {}
};

// }
// // Location components

// var LocationsIndexPage = {
//   template: "#locations-index-page",
//   data: function() {
//     return {
//       locations: [],
//       location: this.location,
//       searchName: "",
//       searchYear: ""

//     };
//   },
//   created: function() {
//     axios.get("/locations")
//     .then(function(response) {

//       this.locations = response.data;

//     }.bind(this));
  
//   },
//   methods: {
//     isValid:function(location) {
//       var validName = location.name
//         .toLowerCase()
//         .includes(this.searchName.toLowerCase());
//       var validYear = location.year
//         .toLowerCase()
//         .includes(this.searchYear.toLowerCase());
//       return validName && validYear

//     },
//     go: function() {
//       axios.get("/locations?search_name=" + this.searchName + "&search_year=" + this.searchYear).then(function(response) {

//          this.locations = response.data; 

         
//          console.log(this.locations);

//       }.bind(this));

//     }
//   },
//   updated:function() {
//     // this.initMap();

    
//   },
//   computed: {

//   }
// };



var LocationsIndexPage = {
  template: "#locations-index-page",
  name: 'google-map',
  props: ['name'],
  data: function() {
    return {
      locations: [],
      location: this.location,
      searchName: "",
      searchYear: "",
      lt: "",
      lg: "",
      markerCoordinates: [{
        latitude: 51.501527,
        longitude: -0.1921837
      }, {
        latitude: 51.505874,
        longitude: -0.1838486
      }, {
        latitude: 51.4998973,
        longitude: -0.202432
      }],
      mapName: this.name + "-map",
      map: null,
      bounds: null,
      markers: []

    };
  },
  created: function() {
    axios.get("/locations")
    .then(function(response) {
      this.locations = response.data;
    }.bind(this));
    console.log(this.locations);
    // this.initMap();
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
    letterName:function(l) {
      this.letterName
    },
    go: function() {
      axios.get("/locations?search_name=" + this.searchName + "&search_year=" + this.searchYear).then(function(response) {

         this.locations = response.data; 
         // this.lt = response.data.latitude;
         // this.lg = response.data.longitude;
         
         console.log(this.locations);

      }.bind(this));
      // this.initMap();

    },
    // initMap: function() {
    //   console.log(this.lt);
    //   console.log(this.lg);
    //     var uluru = {lat: this.lt, lng: this.lg};

    //     var map = new google.maps.Map(document.getElementById('map'), {
    //       zoom: 15,
    //       center: uluru
       
    //     });
    //     this.locations.forEach(function(location) {

    //       var marker = new google.maps.Marker({
    //         position: position,
    //         map: map
    //       });

    //     });         

    // }
  },
  updated: function () {
      // this.markerCoordinates = this.locations.forEach(function(charlie) {
      //   return { latitude: charlie.latitude,longitude: location.longitude }
      // })
      this.$nextTick(
        function () {
          // var service_data = [{
          //                    latitude: this.location.latitude,
          //                    longitude: this.longitude.longitude,
          //                    name: this.location.name,
          //                    address: this.location.address,
          //        }]
          console.log(this.locations);
          this.markerCoordinates = this.locations.map(function(location) {
            return {latitude: location.latitude, longitude: location.longitude}
          });
          this.bounds = new google.maps.LatLngBounds();
          const element = document.getElementById(this.mapName)
          const mapCentre = this.markerCoordinates[0]
          const options = {
            center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
          }
          var index = 0;

          this.map = new google.maps.Map(element, options);

          this.markerCoordinates.forEach((coord) => {
              const position = new google.maps.LatLng(coord.latitude, coord.longitude);
              const marker = new google.maps.Marker({ 
                position,
                map: this.map,
                title: "test"
              });
              // var myContent = "<h1>"+this.locations[index].name + "-" + this.locations[index].address+"</h1>"
              var myContent = "<a href='/#/locations/"+this.locations[index].id+"'>"+this.locations[index].name+'<div>'+
                '<p>'+this.locations[index].address+'</p>'+'</div'

              var infowindow = new google.maps.InfoWindow({content:myContent});

              marker.addListener('click',function() {
                infowindow.open(this.map, marker);
              })

            this.markers.push(marker)
            this.map.fitBounds(this.bounds.extend(position))
            index ++;
          });
        }  
      );
  },
  computed: {}
};



var LocationsShowPage = {
  template: "#locations-show-page",
  data: function() {
    return {
      startTime: "",
      endTime: "",
      phoneNumber: "",
      // myLocationID:"",
      location: {
        name: "",
        year: "",
        address: "",
        lt: "",
        lg: "",
        stories:[]
        // location.location_story: "",
      },
      errors: []
    }
  },
  created: function() {
    axios.get("/locations/" + this.$route.params.id )
      .then(function(response) {
        // console.log("shomething")
        this.location = response.data;
        this.lt = parseFloat(response.data.latitude);
        this.lg = parseFloat(response.data.longitude);
        console.log(this.location);
      }.bind(this));
      this.initMap();
  },


  methods: {
    initMap: function() {
      console.log(this.lt);
      console.log(this.lg);
        var landmark = {lat: this.lt, lng: this.lg};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center:landmark,
          



        });
        var mapOptions = {
          zoom: 18,
          center: landmark
          // mapTypeId: 'satellite',
          
        };





        var marker = new google.maps.Marker({
          position: landmark,
          map: map,
          icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          title: 'Click to zoom'

        });


        map.addListener('center_changed', function() {
          // 3 seconds after the center of the map has changed, pan back to the
          // marker.
          window.setTimeout(function() {
            map.panTo(marker.getPosition());
          }, 3000);
        });
        marker.addListener('click', function() {
            map.setZoom(16);
            map.setCenter(marker.getPosition());
          });

      console.log(landmark);
    },

    submit: function() {
      var params = {
        // user_id: this.userId,
        location_id: this.location.id,
        start_time: this.startTime,
        end_time: this.endTime,
        phone_number: this.phoneNumber

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
  },
  updated:function() {
    this.initMap(); 
    
  },
  computed: {}
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

  computed: {},
  mounted: function() {
    $(document).ready(function () {
      $.HSCore.components.HSCarousel.init('.js-carousel');
    });
  },
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

// var UserLocationsNewPage = {
//   template: "#users-locations-new-page",
//   data: function() {
//     return {
//       userId: "",
//       locationId: "",
//       startTime: "",
//       endTime: "",
//       errors: []
//     };
//   },

//   created:function() {
//     console.log(LocationsShowPage.data)
//   },
//   methods: {
//     submit: function() {
//       var params = {
//         user_id: this.userId,
//         location_id: this.locationId,
//         start_time: this.startTime,
//         end_time: this.endTime

//       };
//       axios
//         .post("/user_locations", params)
//         .then(function(response) {
//           router.push("/");
//         })
//         .catch(
//           function(error) {
//             if (error.response.status === 401){
//               router.push("/login");
//             } else if (error.response.status === 422) {
//               this.errors = error.response.data.errors;
//             } else {
//               router.push("/");
//             }
//           }.bind(this)
//         );
//     }
//   }
// };






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
  // { path: "/locations/:id", component: RandomPage},
  { path: "/locations", component: LocationsIndexPage},
  { path : "/user_locations/", component: UserLocationsIndexPage},
  // { path: "/user_locations/new", component: UserLocationsNewPage},
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


  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }

  }
});





