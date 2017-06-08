angular.module('starter.controllers', ['ionic'])

.controller('WeatherCtrl', function($scope, GetWeather, $timeout) {
  $scope.cityWeather = {
    'query' : '',
    'weather' : ''
  };
  $scope.favorites = {};
  var arrFavorites =[];
   $scope.showMe = false;
   $scope.showSuccess = false;

  //autocomplete Google API
    var inputFrom = document.getElementById('autocomplete');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom);

    google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();
        $scope.cityWeather.query = place.formatted_address;
        $scope.$apply();
    });

    //touch
     $scope.disableTap = function(){
      var container = document.getElementsByClassName('pac-container');
      // disable ionic data tab
      angular.element(container).attr('data-tap-disabled', 'true');
      // leave input field if google-address-entry is selected
      angular.element(container).on("click", function(){
          document.getElementById('autocomplete').blur();
      });
    }

  $scope.getWeather = function(){
    $scope.showMe = true;
    GetWeather.getWeather($scope.cityWeather.query).then(function(response){
       var result = Math.round(+response.data.main.temp - 273);
       $scope.cityWeather.weather = result + "°";
      })

  };
  $scope.addToFavourites = function(){
    GetWeather.add($scope.cityWeather);
    $scope.favorites =  GetWeather.getFavourites($scope.cityWeather);
     $scope.showSuccess = true;
     function f(){
       $scope.showSuccess = false
     }
     setTimeout(function() { f() }, 3000);
       $scope.cityWeather = {};
       $scope.showMe = false;
  };

})

.controller('FavsCtrl', function($scope, GetWeather) {
  $scope.favorites = {};
  $scope.favorites =  GetWeather.getFavourites($scope.cityWeather);

  $scope.removeFromFavourites = function(index){
       GetWeather.remove(index);
$scope.favorites =  GetWeather.getFavourites();
  };


});
