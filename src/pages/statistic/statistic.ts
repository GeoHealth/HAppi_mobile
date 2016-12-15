import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { OccurrenceStorage } from '../../app/provider/occurrence_storage';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';

@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.html'
})
export class StatisticPage {

  occurrences_storage: OccurrenceStorage;

  map: GoogleMap;

  constructor(public navCtrl: NavController, public platform: Platform,  occurrence_storage: OccurrenceStorage) {
    this.occurrences_storage = occurrence_storage;
    platform.ready().then(() => {
            this.loadMap();
        });
  }

  loadMap(){
      let location = new GoogleMapsLatLng(-34.9290,138.6010);

      this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });
  }

}
