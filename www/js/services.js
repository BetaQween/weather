angular.module('starter.services', ['ionic'])

.factory('GetWeather', function($http) {
var API_ID = '57f5d5fd07d7bee8993229a61a9de650';
var favourites =[];

getWeather = function(cityName){
return  $http.get('http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&APPID='+API_ID)
}
addFavourites = function(response){
  favourites.push(response);
}
getFavourites= function(){
  return favourites;
}
removeFavourites = function(index){
favourites.splice(index, 1);
}
return{
      getWeather: getWeather,
      add: addFavourites,
      getFavourites: getFavourites,
      remove: removeFavourites
}
});
