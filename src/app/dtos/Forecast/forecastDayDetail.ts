import {AstroDetail} from './astroDetail';
import {DayDetail} from './dayDetail';
import {HourDetail} from './hourDetail';

export interface ForecastDayDetail {
  date: Date;
  date_epoch: number;
  day: DayDetail;
  astro: AstroDetail;
  hour: HourDetail[];
}
