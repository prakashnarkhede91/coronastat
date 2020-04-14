import { Component } from '@angular/core';
import { CovidService } from "./covid.service";
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  citys: any = [];
  summary: any = [];
  Deaths: any = 0;
  Confirmed: any = 0;
  Discharged: any = 0;
  public pieChartData: SingleDataSet = [0, 0, 0];
  chartfor: any;
  result: any = [];




  constructor(
    public restApi: CovidService
  ) {

  }

  ngOnInit() {
    this.getCovidData();

  }

  getCovidData() {
    this.restApi.getData().subscribe((data1: any) => {
      if (data1.success) {
        this.summary = data1.data.summary;
        this.initializeChart(this.summary.deaths, this.summary.total, this.summary.discharged);
        this.chartfor = "India";
        this.citys = data1.data.regional;
      }
    })
  }

  initializeChart(Deaths: number, Confirmed: number, Discharged: number) {
    this.Confirmed = Confirmed;
    this.Deaths = Deaths;
    this.Discharged = Discharged;
    this.pieChartData = [this.Deaths, this.Confirmed, this.Discharged];

  }

  viewChart(type: any, location: any) {

    if (type == 'india') {
      this.getCovidData();
    }
    else {
      this.result = this.citys.filter(city => city.loc == location)[0];
      this.initializeChart(this.result.deaths, this.result.totalConfirmed, this.result.discharged);
      this.chartfor = location;
    }

  }

  title = 'COVID-19 ';
  // Pie
  public pieChartOptions: any = {
    responsive: true,
    legend: { position: 'right' },
    position: "center"
  };
  public pieChartLabels: Label[] = [['Deaths'], ['Confirmed'], 'Discharged'];
  // public pieChartData: SingleDataSet = [this.Deaths, this.Confirmed, this.Discharged];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];




}
