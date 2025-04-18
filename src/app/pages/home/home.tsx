import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { WeatherGetResult } from "../../dtos/weahterGetResult";
import { HourDetail } from "../../dtos/Forecast/hourDetail";
import { DataFormatType, Helper } from "../../core/helper";
import { citiesData } from "../../dtos/cities";
import Card from "../../components/card";
import { ForecastDayDetail } from "../../dtos/Forecast/forecastDayDetail";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const HomePage = () => {
  const [state, setState] = useState<WeatherGetResult>();
  const [city, setCity] = useState<string>("Bursa");
  const [cities, setCities] = useState<string[]>(citiesData);

  const ref: any = useRef(null);

  const { data, error } = useSWR(
    `http://api.weatherapi.com/v1/forecast.json?key=9f1705fbcd4347b5ac5104628211707&q=${Helper.turkishToEnglish(
      city
    )}&days=14&lang=tr`,
    fetcher
  );

  useEffect(() => {
    setState(data);
    scroll();
  }, [data]);

  const scroll = () => {
    const time = new Date().getHours();
    const getTime = time === 0 ? 0 : time;
    ref.current.scrollLeft = 150 * getTime;
  };

  const filterCity = (event: any) => {
    if (event) {
      if (event.target.value.length > 0) {
        setCities(
          citiesData.filter((i) =>
            i.toLowerCase().includes(event.target.value.toLowerCase())
          )
        );
      } else {
        setCities(citiesData);
      }
    }
  };

  return (
    <>
      <div className="pageContainer">
        <div className="pageContainer__sidebar">
          <input
            className="pageContainer__sidebar__search-input"
            type="text"
            placeholder="Şehir Ara..."
            onChange={filterCity}
          />

          <div className="pageContainer__sidebar__cities-list">
            {cities.map((item, i) => {
              return (
                <div
                  onClick={() => setCity(item)}
                  className={`pageContainer__sidebar__cities-list__item ${
                    item == city ? "active" : ""
                  }`}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>

        <div className="pageContainer__body">
          <div className="pageContainer__body__intro">
            <div className="pageContainer__body__intro__left">
              <div className="pageContainer__body__intro__left__header">
                <div>
                  <i className="bi bi-calendar3"></i> {Helper.getWeekDays()}
                </div>
                <div>
                  {city}, {state?.location.country}
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
              </div>

              <div className="pageContainer__body__intro__left__body">
                <img src={state?.current.condition.icon} />
                <span className="temp">{state?.current.temp_c} °C</span>
              </div>

              <div className="pageContainer__body__intro__left__detail">
                <div className="pageContainer__body__intro__left__detail__item">
                  <span>Hissedilen Sıcaklık</span>
                  <span>{state?.current.feelslike_c}</span>
                </div>

                <div className="pageContainer__body__intro__left__detail__item">
                  <span>Rüzgar</span>
                  <span>{state?.current.wind_kph}</span>
                </div>

                <div className="pageContainer__body__intro__left__detail__item">
                  <span>Bulut Örtüsü</span>
                  <span>{state?.current.cloud}</span>
                </div>

                <div className="pageContainer__body__intro__left__detail__item">
                  <span>Nem</span>
                  <span>{state?.current.humidity}</span>
                </div>

                <div className="pageContainer__body__intro__left__detail__item">
                  <span>Basınç</span>
                  <span>{state?.current.pressure_mb}</span>
                </div>

                <div className="pageContainer__body__intro__left__detail__item">
                  <span>Görüş Mesafesi</span>
                  <span>{state?.current.vis_km}</span>
                </div>

                <div className="pageContainer__body__intro__left__detail__item">
                  <span>UV</span>
                  <span>{state?.current.uv}</span>
                </div>
              </div>
            </div>
            <div className="pageContainer__body__intro__right" ref={ref}>
              {state?.forecast.forecastday[0].hour.map(
                (item: HourDetail, i: number) => {
                  const isActiveHour =
                    Helper.dateFormat(item.time, DataFormatType.hourFormat) ===
                    Helper.dateFormat(
                      state.location.localtime,
                      DataFormatType.hourFormat
                    );

                  return (
                    <div className={`item ${isActiveHour ? "active" : ""}`}>
                      <div>
                        <span>
                          {Helper.dateFormat(
                            item.time,
                            DataFormatType.timeFormat
                          )}
                        </span>
                      </div>

                      <div className="item__body">
                        <img
                          className="item__body__img"
                          src={item.condition.icon}
                        />
                        <div className="item__body__temp">{item.temp_c} °C</div>
                      </div>

                      <div className="item__detail">
                        <div className="item__detail__item">
                          <span>
                            <i className="bi bi-thermometer-half"></i>
                          </span>
                          <span>{item.feelslike_c}</span>
                        </div>

                        <div className="item__detail__item">
                          <span>
                            <i className="bi bi-wind"></i>
                          </span>
                          <span>{item.wind_kph}</span>
                        </div>

                        <div className="item__detail__item">
                          <span>
                            <i className="bi bi-clouds"></i>
                          </span>
                          <span>{item.cloud}</span>
                        </div>

                        <div className="item__detail__item">
                          <span>
                            <i className="bi bi-droplet-half"></i>
                          </span>
                          <span>{item.humidity}</span>
                        </div>

                        <div className="item__detail__item">
                          <span>
                            <i className="bi bi-speedometer2"></i>
                          </span>
                          <span>{item.pressure_mb}</span>
                        </div>

                        <div className="item__detail__item">
                          <span>
                            <i className="bi bi-eye"></i>
                          </span>
                          <span>{item.vis_km}</span>
                        </div>

                        <div className="item__detail__item">
                          <span>
                            <i className="bi bi-brightness-low"></i>
                          </span>
                          <span>{item.uv}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          <div>
            <Card title="Haftalık Hava Durumu">
              <div className="pageContainer__body__days-detail">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "100px" }}>
                        Tarih
                      </th>
                      <th scope="col" style={{ width: "80px" }}>
                        Durum
                      </th>
                      <th scope="col" style={{ width: "80px" }}>
                        Ort.
                      </th>
                      <th scope="col" style={{ width: "80px" }}>
                        Min
                      </th>
                      <th scope="col" style={{ width: "80px" }}>
                        Max
                      </th>
                      <th scope="col" style={{ width: "80px" }}>
                        Rüzgar
                      </th>
                      <th scope="col" style={{ width: "80px" }}>
                        New
                      </th>
                      <th scope="col" style={{ width: "80px" }}>
                        UV
                      </th>
                      <th scope="col" style={{ width: "150px" }}>
                        Yağmur Var Mı?
                      </th>
                      <th scope="col" style={{ width: "150px" }}>
                        Yağmur ihtimali
                      </th>
                      <th scope="col" style={{ width: "150px" }}>
                        Kar Var Mı?
                      </th>
                      <th scope="col" style={{ width: "150px" }}>
                        Kar ihtimali
                      </th>

                      {state?.forecast.forecastday[0].hour.map((h, i) => {
                        return (
                          <th scope="col" style={{ width: "100px" }}>
                            {Helper.dateFormat(
                              h.time,
                              DataFormatType.timeFormat
                            )}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {state?.forecast.forecastday.map(
                      (item: ForecastDayDetail, i: number) => {
                        return (
                          <>
                            <tr>
                              <td>
                                {Helper.dateFormat(
                                  item.date,
                                  DataFormatType.dateFormat
                                )}
                              </td>
                              <td className="text-center">
                                <img
                                  src={item.day.condition.icon}
                                  style={{ height: "20px" }}
                                />
                              </td>
                              <td>{item.day.avgtemp_c}</td>
                              <td>{item.day.mintemp_c}</td>
                              <td>{item.day.maxtemp_c}</td>
                              <td>{item.day.maxwind_kph}</td>
                              <td>{item.day.avghumidity}</td>
                              <td>{item.day.uv}</td>
                              <td>
                                {item.day.daily_will_it_rain === 1
                                  ? "Evet"
                                  : "Hayır"}
                              </td>
                              <td>{item.day.daily_chance_of_rain} %</td>
                              <td>
                                {item.day.daily_will_it_snow === 1
                                  ? "Evet"
                                  : "Hayır"}
                              </td>
                              <td>{item.day.daily_chance_of_snow} %</td>

                              {item.hour.map((h, x) => {
                                return (
                                  <>
                                    <td>{h.temp_c}</td>
                                  </>
                                );
                              })}
                            </tr>
                          </>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
