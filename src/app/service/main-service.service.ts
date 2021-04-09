import { Injectable } from '@angular/core';
import {IOrderStatistic} from "../models/IOrderStatistic";

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {


    statisticList: Array<IOrderStatistic> = [
        {
            period: 1614260545633,
            payments: {
                cash: 300000,
                noncash: 100000,
                credit: 100521,
            },
            averageCheckue: 1300,
            averageGuest: 1200,
            deletedAfterPay: 1000,
            deletedBeforPay: 1300,
            chckueNum: 34,
            guestNum: 34,
        },
        {
            period: 1614347020777,
            payments: {
                cash: 300000,
                noncash: 100000,
                credit: 100521,
            },
            averageCheckue: 900,
            averageGuest: 800,
            deletedAfterPay: 1100,
            deletedBeforPay: 1300,
            chckueNum: 36,
            guestNum: 36,
        }
    ];

  constructor() {}


    public statistic() {
        return this.calculate();
    }

    public calculate(){
        for (let q = 0; q < this.statisticList.length; ++q) {
            let total = 0;
            total = +total + this.statisticList[q]['payments']['cash'];
            total = +total + this.statisticList[q]['payments']['noncash'];
            total = +total + this.statisticList[q]['payments']['credit'];

            this.statisticList[q]['total'] = total;
        }

        return this.statisticList;
    }

    public get_ratio(){

        let retio_guestNum;
        retio_guestNum = Math.round((this.statisticList[0]['guestNum']/this.statisticList[1]['guestNum'])*100-100);

        let retio_chckueNum;
        retio_chckueNum = Math.round((this.statisticList[0]['chckueNum']/this.statisticList[1]['chckueNum'])*100-100);

        let retio_deletedBeforPay;
        retio_deletedBeforPay = Math.round((this.statisticList[0]['deletedBeforPay']/this.statisticList[1]['deletedBeforPay'])*100-100);

        let retio_deletedAfterPay;
        retio_deletedAfterPay = Math.round((this.statisticList[0]['deletedAfterPay']/this.statisticList[1]['deletedAfterPay'])*100-100);

        let retio_averageGuest;
        retio_averageGuest = Math.round((this.statisticList[0]['averageGuest']/this.statisticList[1]['averageGuest'])*100-100);

        let retio_averageCheckue;
        retio_averageCheckue = Math.round((this.statisticList[0]['averageCheckue']/this.statisticList[1]['averageCheckue'])*100-100);

        let retio_cash;
        retio_cash = Math.round((this.statisticList[0]['payments']['cash']/this.statisticList[1]['payments']['cash'])*100-100);

        let retio_noncash;
        retio_noncash = Math.round((this.statisticList[0]['payments']['noncash']/this.statisticList[1]['payments']['noncash'])*100-100);

        let retio_credit;
        retio_credit = Math.round((this.statisticList[0]['payments']['credit']/this.statisticList[1]['payments']['credit'])*100-100);


        let retio_total;
        if(this.statisticList[0]['total'] && this.statisticList[1]['total'] ){
            retio_total = Math.round((this.statisticList[0]['total']/this.statisticList[1]['total'])*100-100);
        }
        let array = [{name: 'retio_cash', value: retio_cash},{name: 'retio_noncash', value: retio_noncash}, {name: 'retio_credit', value: retio_credit},{name: 'retio_averageCheckue', value: retio_averageCheckue}, {name: 'retio_averageGuest', value: retio_averageGuest},{name: 'retio_deletedAfterPay', value: retio_deletedAfterPay},{name: 'retio_deletedBeforPay', value: retio_deletedBeforPay},{name: 'retio_chckueNum', value: retio_chckueNum},{name: 'retio_guestNum', value: retio_guestNum}, {name: 'retio_total', value: retio_total}];
        let retio = {retio_cash: retio_cash, retio_noncash: retio_noncash, retio_credit: retio_credit, retio_averageCheckue: retio_averageCheckue, retio_averageGuest: retio_averageGuest, retio_deletedAfterPay: retio_deletedAfterPay, retio_deletedBeforPay: retio_deletedBeforPay, retio_chckueNum: retio_chckueNum, retio_guestNum: retio_guestNum, retio_total: retio_total};
        let info = [retio, array];
        return info;


    }

}
