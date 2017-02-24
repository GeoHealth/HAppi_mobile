import {Component, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {TranslationProvider} from '../../app/provider/translation_provider';
import {StatsRestService} from '../../app/services/stats_rest_service';
import {SymptomsCounts} from '../../models/symptoms_counts';
import {GlobalVars} from '../../app/provider/global_vars';

@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.html'
})
export class StatisticPage {

  @ViewChild('dailyCanvas') dailyCanvas;

  dailyChart: any;

  private colors: string[] = ["rgba(255,0,0,1)", "rgba(0,0,255,1)"]


  private symptoms_counts: SymptomsCounts;


  constructor(public translation: TranslationProvider, private stats_rest_service: StatsRestService, public vars: GlobalVars) {
    this.vars.setTitle("Statistics");
  }

  ionViewDidLoad() {

    this.stats_rest_service.getAverage().subscribe((success) => {
      if (success) {
        this.symptoms_counts = success;

        let labels = ["Lundi", "Mardi", "Mercrdi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        let datasets = [];

        for(let line = 0; line < this.symptoms_counts.symptoms.length; line++) {
          let y = [];
          let symptom = this.symptoms_counts.symptoms[line];
          let data = [];
          console.log(symptom);
          for(let x = 0; x < symptom.counts.length; x++) {
            data.push(symptom.counts[x].count)
          }
          let dataset = {
            label: symptom.name,
            fill: false,
            lineTension: 0.1,
            borderColor: this.colors[line],
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data,
            spanGaps: false,
          };
          datasets.push(dataset);
        }

        this.dailyChart = new Chart(this.dailyCanvas.nativeElement, {
          type: 'line',
          data: {
            labels: labels,
            datasets: datasets
          }
        });
      }
    })

  }



}
