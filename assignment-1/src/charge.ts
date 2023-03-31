// * ------------------------------
// *
// * charge.ts
// * 請求書(Invoice)と支払い(Paymentes)を受け取り、レシート(Receipt)を返却します。
// * https://github.com/toreta/frontend-recruiting-renhou/tree/main/assignment-1
// *
// * ------------------------------

import type { Invoice, Payment, Receipt } from './charge.type';

/**
 * 請求書と支払い情報を元にレシートを生成する関数
 * @param {Invoice} invoice - 請求書
 * @param {Payment[]} payments - 支払い情報の配列
 * @returns {Receipt} receipt - レシート
 * @throws {Error} 'Shortage' - 支払いが不足している場合
 * @throws {Error} 'OverCharge' - クーポンで全額支払いが可能な場合に現金も含まれている場合
 */
const charge = (invoice: Invoice, payments: Payment[]): Receipt => {
  // 変数、定数定義
  const total: number = invoice.total;
  let deposit = 0;
  let couponPayment = 0;

  // 各支払い情報に対して、クーポンの場合はcouponPaymentに、現金はdepositに加算する
  payments.forEach((payment: Payment): void => {
    if (payment.type === 'COUPON') {
      couponPayment += payment.percentage
        ? Math.floor(total * (payment.percentage / 100))
        : payment.amount || 0;
    } else {
      deposit += payment.amount || 0;
    }
  });

  // 支払いが請求額を下回る場合はエラー
  if (total > deposit + couponPayment) {
    throw new Error('Shortage');
  }

  // 全ての支払いがクーポンであるかどうかを判定する
  const isCoupon = payments.every((payment: Payment): boolean => payment.type === 'COUPON');
  // クーポンで支払った場合、お釣りは0。それ以外の場合、お釣りは支払い額から請求額を引く
  const change: number = isCoupon ? 0 : deposit + couponPayment - total;

  // クーポンで全額支払いが可能な場合に、現金も含まれている場合はエラーを投げる
  if (!isCoupon && couponPayment >= total) {
    throw new Error('OverCharge');
  }

  return { total, deposit: deposit + couponPayment, change };
};

export { charge };
