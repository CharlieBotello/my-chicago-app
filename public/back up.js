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
      errors: [],
      validMap:false
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
   showMap:function() {
      this.validMap = !this.validMap;
      console.log(this.validMap);
    },


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
        latitude: "",
        longitude: ""    
      }],
      mapName: this.name + "-map",
      map: null,
      bounds: null,
      markers: [],
      validMap: false,

    };
  },
  created: function() {
    axios.get("/locations")
    .then(function(response) {
      this.locations = response.data;


    }.bind(this));
    console.log(this.locations);

    
  },

  methods: {
    showMap:function() {
      this.validMap = !this.validMap;
    },
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
      this.validMap = true;
      console.log("myGo");
      axios.get("/locations?search_name=" + this.searchName + "&search_year=" + this.searchYear).then(function(response) {

        // markerCoordinates = [];

        // for(let location of response.data) {
        //   this.locations.push({latitude: location.latitude, longitude: location.longitude});
        // }

         // this.locations = response.data; 
         // this.lt = response.data.latitude;
         // this.lg = response.data.longitude;
         
         // console.log(this.locations);
         this.locations = response.data;

      }.bind(this));
      // this.initMap();

    },

  },
  updated: function () {
      // this.markerCoordinates = this.locations.forEach(function(charlie) {
      //   return { latitude: charlie.latitude,longitude: location.longitude }
      // })
      this.$nextTick(
        function () {
          console.log(this.locations);
              $('input[name=filter]').change(function (e) {
               map_filter(this.id);
                filter_markers()
            });
   

          // this.markerCoordinates = this.locations.filter(function(location){
          //   if (location.name.toLowerCase() === "CHARLES TURZAK HOUSE".toLowerCase()) {
          //     console.log(location);
          //     return location;
          //   }
          // }).map(function(location) {
          //   return {latitude: location.latitude, longitude: location.longitude}
          // });

          this.markerCoordinates = this.locations.map(function(location) {
            return {latitude: location.latitude, longitude: location.longitude}
          });

          console.log(this.markerCoordinates);

          
          


          


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
      
              var myContent = "<a href='/#/locations/"+this.locations[index].id+"'>"+this.locations[index].name+'<div>'+
                '<center>'+this.locations[index].year+'</center>'+'</div'

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

