import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  },
  label: {
    color: string;
    text: string;
    fontSize: string;
    fontWeight: string;
  },
  title: string,
  info: string,
  departamento: string,
  marker?: google.maps.Marker
};

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {
  private map!: google.maps.Map
  
  constructor() { }

  newMarker: MarkerProperties = {
    position: { lat: 0, lng: 0 },
    label: { color: 'black', text: '', fontSize: '20px', fontWeight: 'bold' },
    title: '',
    info: '',
    departamento: '',
  };

  markers: MarkerProperties[] = [
    {
      position: { lat: -12.0491625, lng: -76.9554737 },
      label: { color: 'black', text: 'Tienda N°25', fontSize: '20px', fontWeight: 'bold' },
      departamento: 'Lima',
      title: 'Santa Anita',
      info: 'Tienda de Juguetes'
    },
    {
      position: { lat: -12.0331625, lng: -76.9554737 },
      label: { color: 'black', text: 'Tienda N°2', fontSize: '20px', fontWeight: 'bold' },
      departamento: 'Lima',
      title: 'San Miguel',
      info: 'TIenda de Bazar'
    },
    {
      position: { lat: -12.0331625, lng: -76.9689937 },
      label: { color: 'black', text: 'Tienda N°3', fontSize: '20px', fontWeight: 'bold' },
      departamento: 'Lima',
      title: 'San Isidro',
      info: 'Tienda de Mesas'
    },
  ];

  mapOptions: google.maps.MapOptions = {
    center: { lat: -12.03581, lng: -76.958392 },
    zoom: 15,
    mapTypeControl: false
  };

  initMap() {
    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    const mapElement = document.getElementById("map") as HTMLElement;

    this.map = new google.maps.Map(mapElement, this.mapOptions);

    this.markers.forEach((position, i) => {
      const label = position.label;
      const marker = new google.maps.Marker({
        position: position.position,
        label: label,
        map: this.map,
      });
      position.marker = marker
      marker.addListener("click", () => {
        const msg = position.title + "<br>" + position.info;
        infoWindow.setContent(msg);
        infoWindow.open(this.map, marker);
      });
    });
  }

  ngOnInit(): void {
    this.initMap();
  }

  verTiendas(distrito: string) {
    const marcador = this.markers.find((marker) => marker.title === distrito);

    if (marcador) {
      this.centrarMarcador(marcador);
    }
  }
  
  centrarMarcador(mkr: MarkerProperties) {
    const marcadorACentrar = mkr;
  
    this.map.setCenter(marcadorACentrar.position);
    this.map.setZoom(17);
  }
  
  eliminarMarcador(marcador: MarkerProperties) {
    if (marcador.marker) {
      marcador.marker.setMap(null);
    }
  
    const indice = this.markers.indexOf(marcador);
    if (indice !== -1) {
      this.markers.splice(indice, 1);
    }
  }
  
  crearMarcador(marcador: MarkerProperties) {
    
    this.markers.push({...marcador});

    const label = marcador.label;
    const position = marcador.position
    const marker = new google.maps.Marker({
      position: position,
      label: label,
      map: this.map,
    });

    marcador.marker = marker;

    this.map.setCenter(marcador.position);
    this.map.setZoom(17);

    this.newMarker = {
      position: { lat: 0, lng: 0 },
      label: { color: 'black', text: '', fontSize: '20px', fontWeight: 'bold' },
      departamento: '',
      title: '',
      info: '',
    };
}
}
