export interface IOrderStatistic{
            [key: string]: any,

            total?: number,

            period: number,
            /**
             * Тип оплаты
             */
            payments: {
                [key: string]: any,
                cash: number,
                noncash: number,
                credit: number,
            },
            /**
             * Средний чек
             */
            averageCheckue: number,
            /**
             * Среднеий гость
             */
            averageGuest: number,
            /**
             * Удаления из чека после оплаты
             */
            deletedAfterPay: number,
            /**
             * Удаление из счета
             */
            deletedBeforPay: number,
            /**
             * Количество чеков
             */ chckueNum: number,
            /**
             * Количество гостей
             */
            guestNum: number,
}
