async function mapTrash(year){
  var map

  try{
    map = L.map('map').setView([37.5, -120], 6);
  }
  catch(e){
    var container = L.DomUtil.get('map');
    if(container != null){
      container._leaflet_id = null;
    }
    map = L.map('map');
  }



  const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // control that shows state info on hover
  const info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  info.update = function (props) {
    const contents = props ? `<b>${props.name}</b><br />${Math.round(props[year].tons_disposed / props[year].population * 1000)} tons per 1000 people` : 'Hover over a county';
    this._div.innerHTML = `<h4>California Trash Density</h4>${contents}`;
  };

  info.addTo(map);


  // get color depending on population density value
  function getColor(d) {
    return d > 2000 ? '#800026' :
      d > 1500  ? '#BD0026' :
      d > 1000  ? '#E31A1C' :
      d > 750  ? '#FC4E2A' :
      d > 500   ? '#FD8D3C' :
      d > 250   ? '#FEB24C' :
      d > 100   ? '#FED976' : '#FFEDA0';
  }

  function style(feature) {
    return {
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 1.0,
      fillColor: getColor(feature.properties[year].tons_disposed / feature.properties[year].population * 1000)
    };
  }

  function highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });

    layer.bringToFront();

    info.update(layer.feature.properties);
  }

  const geojson = L.geoJson(countyData, {
    style,
    onEachFeature
  }).addTo(map);

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
  }

  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }

  map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');

  const legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

    const div = L.DomUtil.create('div', 'info legend');
    const grades = [0, 100, 250, 500, 750, 1000, 1500, 2000];
    const labels = [];
    let from, to;

    for (let i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];

      labels.push(`<i style="background:${getColor(from + 1)}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
    }

    div.innerHTML = labels.join('<br>');
    return div;
  };

  legend.addTo(map);
}
