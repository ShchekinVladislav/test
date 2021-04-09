import {Component} from '@angular/core';

import {MainServiceService} from "./service/main-service.service";

import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import 'jquery';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'test-task';
  public settings = false;
  public statistic;
  public titles = 'Выручка';
  public calc_del = 0; //подсчет количества удаленных строк что бы нельзя было удалить последнюю строку

    lineChartData: ChartDataSets[];
    lineChartLabels: Label[];
    public lineChartOptions : any;
    lineChartColors: Color[];
    public lineChartLegend: any;
    public lineChartPlugins: any;
    public lineChartType: any;

    public ratio: any;
    public label_tabel:any;

  constructor(
      private MainService: MainServiceService,
  ){
   this.statistic = this.MainService.statistic();
   let info = this.MainService.get_ratio();
   this.ratio = info[0];
      let res = [];
      let label = [];
      let quantity;

      label.push('');
      res.push(0);
      this.label_tabel = [];

      for (let q = 0; q < this.statistic.length; ++q) {
          res.push(this.statistic[q]['total']);
          label.push(this.generate_label(this.statistic[q]));
          console.log(1);
          this.label_tabel.push(this.generate_label(this.statistic[q]));
      }
      quantity = this.calculate_steps(res);
      this.setUpCreates(res,label, quantity);
      this.generate_label(this.statistic);

      this.generate_style_retio(info[1]);
      console.log(this.label_tabel);

  }

  settings_table(){//переход в режим редактирования/просмотра
   if(this.settings){
       this.settings = false;
   }
   else{
       this.settings = true;
   }

   }

  delite(p:any){//удаление строк в таблице
      $(`#${p}`).remove();
      this.calc_del = this.calc_del + 1;

      if(this.calc_del === 9){//проверка на количество удаленных строк
          $(`#settings`).remove();
      }
    }

  calculate_steps(res:any){ //генерация шага данных для графика
        let quantity = 0;
        for (let q = 0; q < res.length; ++q) {
            quantity = quantity + res[q];
        }
        quantity = quantity/4;
        return quantity;
    }
  generate_label(res:any){//создание лейблов для графика

        let milliseconds = res['period'];
        let date = new Date(milliseconds).toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        return date;

    }

  setUpCreates(res:any, label:any, step: number) { //генерация графика
        this.lineChartData = [
            { data: res, label: ''},
        ];
        this.lineChartLabels = label;
        this.lineChartOptions = {
            responsive: true,
            scales: {
                yAxes: [{
                    gridLines : {
                        display : false
                    },
                    ticks: {
                        beginAtZero: true,
                        minorTickInterval: null,
                        stepSize: step,
                    },
                }],
                xAxes: [{
                    gridLines : {
                        display : false
                    }
                }]
            },

            legend: {
                display: false,
            }
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(53,109,177,0.2)',
                borderColor: 'rgba(53,109,177,1)',
                pointBackgroundColor: 'rgba(53,109,177,0.8)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(53,109,177,0.8)',
            },
        ];
        this.lineChartLegend = true;
        this.lineChartPlugins = [];
        this.lineChartType = 'line';

    }

  new_static(p:string, titles: string){//запуск функции генерации графиков
      this.titles = titles;
      if(p !== 'cash' && p !== 'noncash' && p !== 'credit'){
        this.generate_statistic(p);
      }
      else{
         this.generate_statistic_payments(p);
      }
    }

  generate_statistic(p:any){//генерация графиков без выручки
        let res = [];
        let label = [];
        let quantity;

        label.push('');
        res.push(0);
        for (let q = 0; q < this.statistic.length; ++q) {
            res.push(this.statistic[q][p]);
            console.log(res);
            label.push(this.generate_label(this.statistic[q]))
        }
        quantity = this.calculate_steps(res);
        this.setUpCreates(res,label, quantity);
        this.generate_label(this.statistic);
    }
  generate_statistic_payments(p:any){//генерация графиков с выручкой
        let res = [];
        let label = [];
        let quantity;

        label.push('');
        res.push(0);
        for (let q = 0; q < this.statistic.length; ++q) {
            res.push(this.statistic[q]['payments'][p]);
            console.log(res);
            label.push(this.generate_label(this.statistic[q]))
        }
        quantity = this.calculate_steps(res);
        this.setUpCreates(res,label, quantity);
        this.generate_label(this.statistic);
    }
  generate_style_retio(res: any){//генерация класса блока от его значения


      setTimeout(() => {

          for (let q = 0; q < res.length; ++q) {
              if(res[q]['value'] > 0){
                  $(`#${res[q]['name']}`).addClass( "good");
              }

              if(res[q]['value'] < 0){
                  $(`#${res[q]['name']}`).addClass( "bad");
              }

              if(res[q]['value'] === 0){
                  $(`#${res[q]['name']}`).addClass( "none");
              }
          }

      }, 1);

  }

}

