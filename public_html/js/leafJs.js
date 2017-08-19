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
            id: 'mapbox.light',  
            accessToken: "pk.eyJ1IjoiZ3NhbmdyYW0iLCJhIjoiY2o0cXh1Ymc5MmJldjMybnU3ZmE2N291eCJ9.OD8iQgZWre9BHy2f5Tl_nw"
        }).addTo(mymap)
        
       

// calling needy functions 
//    onMapMarker();
    createButton('resize'+id);

     
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
        mymap.setView([52.03222, 16.52344], 1.5);
    });
    }
    
L.MakiMarkers.accessToken = "pk.eyJ1IjoiZ3NhbmdyYW0iLCJhIjoiY2o0cXh1Ymc5MmJldjMybnU3ZmE2N291eCJ9.OD8iQgZWre9BHy2f5Tl_nw"
var icon = L.MakiMarkers.icon({icon: "rocket", color: "#b0b", size: "m"});
    
//console.log('countries',countries);
// Adding markers to each selection
for ( var i=0; i < countries.features.length; ++i ) {
   L.marker( [countries.features[i].properties.lat, countries.features[i].properties.lng],{icon: icon} )
      .bindPopup( '<a href="' + countries.features[i].properties.url + '" target="_blank">' + countries.features[i].properties.name 
                  +'( coordinates:'+countries.features[0].properties.lat+', '+countries.features[0].properties.lng+ ')</a>')
                  .addTo(mymap);
}


function getColor(d) {
    console.log('d',d);
    return d==1  ? '#2ca25f' :
           d==2  ? '#feb24c' :
           d==3  ? '#3182bd' :
           d==4  ? '#c51b8a' :
           d==5  ? '#e34a33' :
                     '#000000';
}

// adding the required color and density
function style(feature) {
     console.log('feature ooo',feature.id);
    return {
        fillColor: getColor(feature.id),
        weight: 1,
        opacity: 0.9,
        color: 'black',
        dashArray: '3',
        fillOpacity: 01
    };
}
// assigning the geojson data to map for custom selection 
L.geoJson(countries, {style: style}).addTo(mymap);

// highlighting when hovered on am country 
function highlightFeature(e) {
    var layer = e.target;
//console.log('layer',layer);
    layer.setStyle({
        weight: 5,
        color: '#000000',
        dashArray: '',
        fillOpacity: 1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
    }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
//    console.log('e.target.getBounds()',e.target.getBounds());
    mymap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(countries, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(mymap);
}
