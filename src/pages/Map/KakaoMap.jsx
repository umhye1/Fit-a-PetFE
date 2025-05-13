import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import search from "../../assets/images/search1.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vw 5vw;
  justify-content: center;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const MapSearch = styled.div`
  width: 35vw;
  height: 2.5vw;
  border: 0.1vw solid #CECAC5;
  border-radius: 1vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 3vw 3vw 1vw 0vw;
  padding: 0 1vw;
  font-size: 0.9vw;
  color: #2E2923;
  outline: none;
  cursor: text;
  overflow: hidden;
  position: relative;
`;
const SearchInput = styled.input`
  width: 35vw;
  height: 2.5vw;
  border: 0vw solid;
  border-radius: 1vw;
  font-size: 0.9vw;
  padding: 0 1vw;
  outline: none;
`;

const SearchImg = styled.img`
  width: 1.5vw;
  height: 1.5vw;
`;

const MapContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const KakaoMapBox = styled.div`
  width: 40vw;
  height: 30vw;
  border-radius: 1vw;
  box-shadow: 0 0 1vw rgba(0, 0, 0, 0.1);
`;





const MapPage = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [input, setInput] = useState('');
  const [markers, setMarkers] = useState([]);
  const infoWindowRef = useRef(null);

  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
          const center = new window.kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          const options = { center, level: 3 };
          const mapInstance = new window.kakao.maps.Map(mapRef.current, options);
          setMap(mapInstance);
        });
      });
    }
  }, []);


  const clearMarkers = () => {
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
  };

  return (
    <Container>
      <SearchContainer>
        <MapSearch>
          <SearchInput
            placeholder="검색어를 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
          <SearchImg src={search} alt="Search" />
        </MapSearch>
      </SearchContainer>

      <MapContainer>
        <KakaoMapBox ref={mapRef} id="map" />

       
      </MapContainer>
    </Container>
  );
};

export default MapPage;
