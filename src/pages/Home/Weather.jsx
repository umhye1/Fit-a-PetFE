// WeatherWidget.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// 스타일 컴포넌트
const WeatherCard = styled.div`
  background-color: #FDF7F2;
  color: #2E2923;
  width: 20vw;
  padding: 2vw;
  border-radius: 1vw;
  box-shadow: 0 0 0.5vw rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const WeatherText = styled.div`
  font-size: 1vw;
  font-weight: 500;
`;

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const { x, y } = dfs_xy_conv(latitude, longitude);

      const serviceKey = 'hLSNDTxN2ptEiBQqHIjrCuDkP17qbS9Idp7gIBNJObsisRFCDaxycNBVypQTl9vR%2FJuoQtgdl%2FG9X1J7wObflA%3D%3D';
      const today = new Date();
      const baseDate = today.toISOString().slice(0, 10).replace(/-/g, '');
      const baseTime = getBaseTime(); // 또는 가까운 발표 시각으로 설정

      const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${serviceKey}&numOfRows=100&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${x}&ny=${y}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        const items = data.response.body.items.item;

        // 날씨 정보 필터링
        const tmp = items.find((item) => item.category === 'TMP')?.fcstValue;
        const sky = items.find((item) => item.category === 'SKY')?.fcstValue;
        const pty = items.find((item) => item.category === 'PTY')?.fcstValue;

        const skyMap = { '1': '☀️ 맑음', '3': '⛅ 구름많음', '4': '☁️ 흐림' };
        const ptyMap = { '0': '', '1': '🌧️ 비', '2': '🌨️ 비/눈', '3': '❄️ 눈' };

        const condition = pty !== '0' ? ptyMap[pty] : skyMap[sky];

        setWeather({
          temp: tmp,
          condition: condition,
          location: '현재 위치',
        });
      } catch (e) {
        console.error('기상청 날씨 API 실패:', e);
      }
    });
  }, []);

  if (!weather) return null;

  return (
    <WeatherCard>
      <WeatherText>
        🌇 {weather.location} 현재 날씨<br />
        {weather.condition}, {weather.temp}°C
      </WeatherText>
      <WeatherText style={{ marginTop: '1vw', fontWeight: '700' }}>
        {weather.condition.includes('맑음') ? '지금 산책 어때요? 🐶' : '오늘도 함께 걸어요!'}
      </WeatherText>
    </WeatherCard>
  );
};

// 격자 좌표 변환 함수
function dfs_xy_conv(lat, lon) {
  const RE = 6371.00877;
  const GRID = 5.0;
  const SLAT1 = 30.0;
  const SLAT2 = 60.0;
  const OLON = 126.0;
  const OLAT = 38.0;
  const XO = 43;
  const YO = 136;

  const DEGRAD = Math.PI / 180.0;
  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);

  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;

  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = re * sf / Math.pow(ro, sn);

  const ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
  const r = re * sf / Math.pow(ra, sn);

  let theta = lon * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;

  const x = Math.floor(r * Math.sin(theta) + XO + 0.5);
  const y = Math.floor(ro - r * Math.cos(theta) + YO + 0.5);
  return { x, y };
}

// 현재 시간 기준 가장 가까운 base_time 구하기
function getBaseTime() {
    const now = new Date();
    const hour = now.getHours();
  
    if (hour < 2) return '2300';
    else if (hour < 5) return '0200';
    else if (hour < 8) return '0500';
    else if (hour < 11) return '0800';
    else if (hour < 14) return '1100';
    else if (hour < 17) return '1400';
    else if (hour < 20) return '1700';
    else if (hour < 23) return '2000';
    else return '2300';
  }  

export default WeatherWidget;
