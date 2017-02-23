import {Component, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {TranslationProvider} from '../../app/provider/translation_provider';
import {StatsRestService} from '../../app/services/stats_rest_service';
import {AveragePerPeriod} from '../../models/average_per_period';

@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.html'
})
export class StatisticPage {

  @ViewChild('dailyCanvas') dailyCanvas;

  dailyChart: any;

  private colors: string[] = ["rgba(255,0,0,1)", "rgba(0,0,255,1)"]


  private average_per_period: AveragePerPeriod


  constructor(public translation: TranslationProvider, private stats_rest_service: StatsRestService) {

  }

  ionViewDidLoad() {

    this.stats_rest_service.getAverage().subscribe((success) => {
      if (success) {
        this.average_per_period = success;

        let labels = ["Lundi", "Mardi", "Mercrdi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        let datasets = [];

        for(let line = 0; line < this.average_per_period.symptoms.length; line++) {
          let y = [];
          let symptom = this.average_per_period.symptoms[line];
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
            data: symptom.averages,
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
