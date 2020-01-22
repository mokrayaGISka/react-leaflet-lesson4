import React from "react";
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Basemap from './Basemaps';
import GeojsonLayer from './GeojsonLayerFunc';
import './Map.css';

// указываем путь к файлам marker
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

class MapComponent extends React.Component {
  state = {
    lat: 55.702868,
    lng: 37.530865,
    zoom: 3,
    basemap: 'osm',

    geojsonvisible: false,
  };

  onBMChange = (bm) => {
    this.setState({
      basemap: bm
    });
  }

  onGeojsonToggle = (e) => {
    
    this.setState({
      geojsonvisible: e.currentTarget.checked
    });
  }

  render() {
    var center = [this.state.lat, this.state.lng];

    const basemapsDict = {
      osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      hot: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    }

    return (
      <Map zoom={this.state.zoom} center={center}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={basemapsDict[this.state.basemap]}
        />
        <Basemap basemap={this.state.basemap} onChange={this.onBMChange} />

        <div className="geojson-toggle">
          <label htmlFor="layertoggle">Toggle Geojson </label>
          <input type="checkbox"
            name="layertoggle" id="layertoggle"
            value={this.state.geojsonvisible} onChange={this.onGeojsonToggle} />
        </div>
        
        {this.state.geojsonvisible && 
          <GeojsonLayer url="places.json" cluster={true}/>
        }

        <Marker position={center}>
          <Popup><div>Выбрана тема {this.state.basemap}</div></Popup>
        </Marker>
      </Map>
    );
  }
};

export default MapComponent;