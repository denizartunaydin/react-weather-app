import {Current} from './current';
import {ForecastDay} from './forecastDay';
import {Location} from './location';

export interface WeatherGetResult {
  location: Location;
  current: Current;
  forecast: ForecastDay;
}
