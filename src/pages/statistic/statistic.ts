import { Component, ViewChild } from "@angular/core";
import { Chart } from "chart.js";
import { TranslationProvider } from "../../app/provider/translation_provider";
import { StatsRestService } from "../../app/services/stats_rest_service";
import { SymptomsCounts } from "../../models/symptoms_counts";
import { GlobalVars } from "../../app/provider/global_vars";
import { isNullOrUndefined } from "util";
import * as moment from "moment";
import { Crashlytics } from "../../app/services/crashlytics";

@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.html'
})
export class StatisticPage {

  @ViewChild('dailyCanvas') dailyCanvas;

  dailyChart: any;

  private symptoms_counts: SymptomsCounts;

  private start_date;
  private end_date;

  constructor(public translation: TranslationProvider, private stats_rest_service: StatsRestService, public vars: GlobalVars, private crashlytics: Crashlytics) {
  }

  ionViewDidEnter() {
    this.end_date = moment().utc();
    this.end_date.set({'hour': 23, 'minutes': 59, 'seconds': 59});
    this.start_date = moment(this.end_date).subtract(7, 'days');
    this.start_date.set({'hour': 0, 'minutes': 0, 'seconds': 0});
    this.draw("days");
    this.vars.setTitle("Statistics");
  }

  onPageWillEnter() {
    this.draw("days");
  }

  draw(unit: string) {
    let startDateFormated = moment(this.start_date).format();
    let endDateFormated = moment(this.end_date).format();
    console.log(startDateFormated);
    console.log(endDateFormated);
    this.stats_rest_service.getCount(startDateFormated, endDateFormated, unit).subscribe((success) => {
      if (success) {
        this.symptoms_counts = success;

        let datasets = [];

        let labels = [];

        if (this.symptoms_counts.symptoms.length > 0) {
          let symptom = this.symptoms_counts.symptoms[0];

          for (let x = 0; x < symptom.counts.length; x++) {
            labels.push(moment(symptom.counts[x].date).format('MM-DD-YYYY'));
          }


          for (let line = 0; line < this.symptoms_counts.symptoms.length; line++) {
            let symptom = this.symptoms_counts.symptoms[line];
            let data = [];

            for (let x = 0; x < symptom.counts.length; x++) {
              data.push(symptom.counts[x].count);
            }

            let color = this.getRandomColor();

            let dataset = {
              label: symptom.name,
              fill: false,
              lineTension: 0.1,
              borderCapStyle: 'butt',
              borderColor: color,
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
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                yAxes: [{
                  ticks: {
                    suggestedMax: 10,
                    min: 0,
                    stepSize: 1
                  }
                }]
              },
              legend: {
                position: 'bottom',
                labels: {
                  usePointStyle: true
                }
              }
            }
          });
        } else {
          if (!isNullOrUndefined(this.dailyChart)) {
            this.dailyChart.destroy();
          }
          this.symptoms_counts = undefined;
        }
      }
    });
  }

  public drawPrevious() {
    this.start_date = moment(this.start_date).subtract(7, 'days');
    this.end_date = moment(this.end_date).subtract(7, 'days');
    this.draw("days");
  }

  public drawNext() {
    this.start_date = moment(this.start_date).add(7, 'days');
    this.end_date = moment(this.end_date).add(7, 'days');
    this.draw("days");
  }


  public getStartDate() {
    return moment(this.start_date).format('DD/MM/YYYY');
  }

  public getEndDate() {
    return moment(this.end_date).format(' DD/MM/YYYY');
  }


  getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  }

  showErrorMsg() {
    return isNullOrUndefined(this.symptoms_counts);
  }

  disable() {
    let now = moment(new Date(moment().get('year'), moment().get('month'), moment().get('date'), 23, 59, 59));
    let duration = moment.duration(now.diff(this.end_date));
    let days = duration.asDays();
    return days === 0;
  }
}
