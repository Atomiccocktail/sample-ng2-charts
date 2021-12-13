import { Component, OnInit } from '@angular/core';
import { ServiceService } from './shared/service.service';
import { ChartOptions } from 'chart.js';
import { ChartDataSets } from 'chart.js';
// import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chart-ng';
  ebookData = [];
  daySelected = 'last7days';
  kpiValuesSelected = 'ebookRoyalty';
  day = [
    {value:'last7days',viewValue:'Last 7 days'},
    {value:'last15days',viewValue:'Last 15 days'},
    {value:'lastmonth',viewValue:'Last Month'},
    {value:'last3months',viewValue:'Last 3 Months'}
  ]
  kpiValues = [
    {value:'ebookRoyalty',viewValue:'Ebook Royality'},
    {value:'paperbackRoyalty',viewValue:'PaperBack Royality'},
    {value:'adSpend',viewValue:'Ad Spend'},
    {value:'adImpressions',viewValue:'Ad Impression'},
    {value:'adClicks',viewValue:'Ad Clicks'}
  ]

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  // public lineChartData: any = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  // ];
  public lineChartLabels: any = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public lineChartOptions: (ChartOptions & { annotation: any }) = {
  //   responsive: true,
  // };
  public lineChartColors: any = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  // public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(private api:ServiceService) { }

  ngOnInit() {
    this.api.apiEbookData().subscribe((data:any)=>{
      this.ebookData=data;
      this.getData();
  });

  

}

getData(){
  let numberofDays = 0;
  let kpi = '';
  let kpiLabel = '';
  if(this.daySelected == 'last7days'){
    numberofDays = 7;
  }else if(this.daySelected == 'last15days'){
    numberofDays = 15;
  }else if(this.daySelected == 'lastmonth'){
    numberofDays = 30;
  }else if(this.daySelected == 'last3months'){
    numberofDays = 90;
  }

  if(this.kpiValuesSelected == 'ebookRoyalty'){
    kpi = 'ebookRoyalty';
    kpiLabel = 'Ebook Royalty'
  }else if(this.kpiValuesSelected == 'paperbackRoyalty'){
    kpi = 'paperbackRoyalty';
    kpiLabel = 'Paperback Royalty'
  }else if(this.kpiValuesSelected == 'adSpend'){
    kpi = 'adSpend';
    kpiLabel = 'Ad Spend'
  }else if(this.kpiValuesSelected == 'adImpressions'){
    kpi = 'adImpressions';
    kpiLabel = 'Ad Impressions'
  }else if(this.kpiValuesSelected == 'adClicks'){
    kpi = 'adClick';
    kpiLabel = 'Ad Click'
  }

  this.lineChartLabels = [];
  this.lineChartData[0].data = [];
  this.lineChartData[0].label = kpiLabel;
  for(let i = 0 ; i<numberofDays; i++){
    let date = this.ebookData[i]['date'];
    var date1 = new Date(date);
    let date2 = date1.toString();
    this.lineChartLabels.push(date1.toLocaleDateString("en-US"));
    this.lineChartData[0].data.push(this.ebookData[i][kpi]);
  }
  debugger;

}

// getDefaultData(){
//   this.lineChartLabels = [];
//   this.lineChartData[0].data = [];
//   this.lineChartData[0].label = 'Ebook Royalty';
//   for(let i = 0 ; i<7; i++){
//     let date = this.ebookData[i]['date'];
//     var date1 = new Date(date);
//     let date2 = date1.toString();
//     this.lineChartLabels.push(date1.toLocaleDateString("en-US"));
//     this.lineChartData[0].data.push(this.ebookData[i]['ebookRoyalty']);
//   }
  
// }


}
