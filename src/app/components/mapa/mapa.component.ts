
import { Component, OnInit, Input, ViewChild } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent {

  @Input() coords: string;
  @ViewChild('mapa') mapa;

  constructor() { }

  ngAfterViewInit() {
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoianVhbi0yNTQiLCJhIjoiY2t2cXRicTVnNGxmYzJ3bnl3ZXF0cjZtdSJ9.VDnJpxEqykcedzfGucczPQ';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  }

}