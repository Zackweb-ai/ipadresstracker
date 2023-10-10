import arrow from "../images/icon-arrow.svg";
import Map from "./Map";
import React, { useState, useEffect } from "react";

const Main = () => {
  const [position, setPosition] = useState(null);
  const [data, setData] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);
  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;
  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=8.8.8.8`
        );
        if (response.ok) {
          const data = await response.json();
          setPosition([data.location.lat, data.location.lng]);
          setData(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getInfo();
  }, []);
  const getData = async () => {
    console.log(process.env.REACT_APP_API_KEY);
    try {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${
          process.env.REACT_APP_API_KEY
        }&${
          checkIpAddress.test(ipAddress)
            ? `ipAddress=${ipAddress}`
            : checkDomain.test(ipAddress)
            ? `domain=${ipAddress}`
            : ""
          }`
      );
      if (response.ok) {
        const data = await response.json();
        setPosition([data.location.lat, data.location.lng]);
        setData(data);
        setIpAddress('');
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const hundleSubmit = () => {
    getData();
  };
  return (
    <div className="container">
      <div className="top">
        <p className="title">IP Address Tracker</p>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            hundleSubmit();
          }}
        >
          <div className="entry">
            <input
              className="input"
              type="text"
              name="adress"
              id="adress"
              placeholder="Search for any IP address or domain"
              value={ipAddress ? ipAddress : ""}
              onChange={(e) => {
                setIpAddress(e.target.value);
              }}
            />
            <div className="btn" onClick={hundleSubmit}>
              <img src={arrow} alt="search" />
            </div>
          </div>
        </form>
        <div className="center">
          <div className="w-7">
            <div className="user-info">
              <div className="ip">
                <p className="title-ip first-style">IP ADRESS</p>
                <p className="ip-adress second-style">{data?.ip}</p>
              </div>
              <div className="location">
                <p className="title-location first-style">LOCATION</p>
                <p className="location-adress second-style">
                  {" "}
                  {data?.location.city}, {data?.location.country}
                </p>
              </div>
              <div className="timezone">
                <p className="title-timezone first-style">TIMEZONE</p>
                <p className="timezone-adress second-style">
                  {data?.location.timezone}
                </p>
              </div>
              <div className="isp">
                <p className="title-isp first-style">ISP</p>
                <p className="isp-adress second-style">{data?.isp}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="map">
        <Map position={position} setPosition={setPosition} data={data}></Map>
      </div>
    </div>
  );
};

export default Main;
