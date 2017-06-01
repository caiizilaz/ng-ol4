import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild("mapElement") mapElement: ElementRef;

  public map: any;

  constructor() {
    var osm_layer: any = new ol.layer.Tile({
      source: new ol.source.TileJSON({
        url: 'https://api.tiles.mapbox.com/v3/mapbox.world-bright.json?secure',
        crossOrigin: 'anonymous'
      })
    });

    // note that the target cannot be set here!
    this.map = new ol.Map({
      layers: [osm_layer],
      view: new ol.View({
        projection: 'EPSG:3857',
        center: [11208726.381490475, 1565984.8950644515],
        zoom: 5.8,
      })
    });
  }

  // After view init the map target can be set!
  ngAfterViewInit() {
    this.map.setTarget(this.mapElement.nativeElement.id);
  }

}
