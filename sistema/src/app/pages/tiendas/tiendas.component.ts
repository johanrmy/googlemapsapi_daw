import { Component } from '@angular/core';

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
  info: string
};


@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent {
  

  mapOptions: google.maps.MapOptions = {
    center: { lat: -12.03581, lng: -76.958392 },
    zoom: 15,
    mapTypeControl: false
  };

  infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  markers: MarkerProperties[] = [
    { position: { lat: -12.0491625, lng: -76.9554737 }, 
      label: { color: 'black', text: 'Tienda N°25', fontSize: '20px', fontWeight: 'bold' },
      title: 'ciudad',
      info: 'ciudad de los reyes'
       }, // Tecsup
    { position: { lat: -12.0331625, lng: -76.9554737 }, 
      label: { color: 'black', text: 'Tienda N°2', fontSize: '20px', fontWeight: 'bold'  },
      title: 'ciudad',
      info: 'ciudad de los reyes'
       }, // Tecsup }, // Louvre Museum
    { position: { lat: -12.0331625, lng: -76.9689937 }, 
      label: { color: 'black', text: 'Tienda N°3', fontSize: '20px', fontWeight: 'bold'  },
      title: 'ciudad',
      info: 'ciudad de los reyes'
       }, // Tecsup }, // Cathédrale Notre-Dame de Paris
  ];


  handleMapInitialized() {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      this.mapOptions
    );

    const markers = this.markers.map((position, i) => {
      const label = position.label;
      const marker = new google.maps.Marker({
        position : position.position,
        label : label
      });

      marker.addListener("click", () => {
        const msg = position.title + "<br>" + position.info
        this.infoWindow.setContent(msg);
        this.infoWindow.open(map, marker);
      })
    });
  }

  verTiendas( distrito: string){

    if(distrito = 'Santa Anita'){
      this.verSantaAnita();
    }
    if(distrito = 'San Miguel'){
      this.verSanMiguel();
    }
    if(distrito = 'San Isidro'){
      this.verSanIsidro();
    }

  }
  
  verSantaAnita(){
    this.mapOptions.center = this.markers[0].position
    this.mapOptions.zoom = 6
    
  }

  verSanMiguel(){
    this.mapOptions.center = this.markers[1].position
    this.mapOptions.zoom = 6
  }

  verSanIsidro(){
    this.mapOptions.center = this.markers[2].position
    this.mapOptions.zoom = 6
  }

  

}
