$(document).ready(function () {
    plotWorldmapWithMarkers("mapid");

});
function plotWorldmapWithMarkers(id) {
// initiallizing the map by setting  geographical coordinates and a zoom level
        var mymap = L.map(id, {
            center: [52.03222, 16.52344],
            minZoom: 0,
            zoom: 2
        });
// ading Mapbox Streets tile layer setView
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, \n\
                 <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, \n\
                 Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 10,
            id: 'mapbox.streets',
            accessToken: "pk.eyJ1IjoiZ3NhbmdyYW0iLCJhIjoiY2o0cXh1Ymc5MmJldjMybnU3ZmE2N291eCJ9.OD8iQgZWre9BHy2f5Tl_nw"
        }).addTo(mymap)
    onMapMarker(mymap);
    createButton('resize'+id);

// adding a marker to the map
    function onMapMarker(mymap)
    {
        L.marker([52.03222, 16.52344]).addTo(mymap).bindPopup('coordinates ' + 52.0322 + ',' + 16.52344);
    }
     
    // creating resize button dynamically with an dynamic button id
    function createButton(bot)
    {
        var butu='<div class="leaflet-control-container" >'+
                '<div class="leaflet-top leaflet-right">'+
                    '<div class="leaflet-control-zoom leaflet-bar leaflet-control">'+
                        '<button type="button" id='+bot+'>Resizer</button>'+
                    '</div>'+
                '</div>'+
            '</div>' ;
    $('#'+id).append(butu);
    $('#'+bot).click(function () {
        mymap.setView([52.03222, 16.52344], 2);
    });
    }
    

}
