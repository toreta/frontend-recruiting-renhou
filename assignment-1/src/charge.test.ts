// * ------------------------------
// *
// * Unit Test
// *
// * ------------------------------

import { charge } from './charge';
import {
  cashOnly,
  multipleCash,
  couponOnly,
  cashAndCoupon,
  cashAndPercentageCoupon,
  invoice5000,
  invoice8000,
  invoice10000,
  invoice12000,
  receipt8000change2000,
  receipt8000change0,
  receipt10000change0,
} from './charge.case';

describe('charge', (): void => {
  it('過不足なく支払った場合、お釣りは0でレシートが返される', (): void => {
    [cashOnly, multipleCash, couponOnly, cashAndCoupon, cashAndPercentageCoupon].forEach(
      (payments): void => {
        expect(charge(invoice10000, payments)).toEqual(receipt10000change0);
      },
    );
  });

  it('金額が不足している場合はエラーを起こす', (): void => {
    [cashOnly, multipleCash, couponOnly, cashAndCoupon, cashAndPercentageCoupon].forEach(
      (payments): void => {
        expect((): void => {
          charge(invoice12000, payments);
        }).toThrowError('Shortage');
      },
    );
  });

  it('現金での過払いはお釣りを返す', (): void => {
    [cashOnly, multipleCash, cashAndCoupon].forEach((payments): void => {
      expect(charge(invoice8000, payments)).toEqual(receipt8000change2000);
    });
  });

  it('クーポンでの過払いはお釣りを返さない', (): void => {
    [couponOnly].forEach((payments) => {
      expect(charge(invoice8000, payments)).toEqual(receipt8000change0);
    });
  });

  it('クーポンで全額払える場合に現金も含まれていればエラーを起こす', (): void => {
    [cashAndCoupon].forEach((payments) => {
      expect((): void => {
        charge(invoice5000, payments);
      }).toThrowError('OverCharge');
    });
  });
});
