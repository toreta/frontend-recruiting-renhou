// * ------------------------------
// *
// * Charge Test Case
// *
// * ------------------------------

import type { Invoice, Payment, Receipt } from './charge.type';

// 現金のみ
export const cashOnly: Payment[] = [{ type: 'CASH', amount: 10000 }];

// 現金複数
export const multipleCash: Payment[] = [
  { type: 'CASH', amount: 5000 },
  { type: 'CASH', amount: 5000 },
];

// クーポンのみ
export const couponOnly: Payment[] = [{ type: 'COUPON', amount: 10000 }];

// クーポンと現金
export const cashAndCoupon: Payment[] = [
  { type: 'CASH', amount: 5000 },
  { type: 'COUPON', amount: 5000 },
];

// 現金とパーセンテージクーポン
export const cashAndPercentageCoupon: Payment[] = [
  { type: 'CASH', amount: 5000 },
  { type: 'COUPON', percentage: 50 },
];

// invoice
export const invoice5000: Invoice = { total: 5000 };
export const invoice8000: Invoice = { total: 8000 };
export const invoice10000: Invoice = { total: 10000 };
export const invoice12000: Invoice = { total: 12000 };

// receipt
export const receipt8000change2000: Receipt = { total: 8000, deposit: 10000, change: 2000 };
export const receipt8000change0: Receipt = { total: 8000, deposit: 10000, change: 0 };
export const receipt10000change0: Receipt = { total: 10000, deposit: 10000, change: 0 };
