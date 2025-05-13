import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import KakaoMap from "./KakaoMap";


const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2vw 5vw;
`;

const PlaceContainer = styled.div`
  margin-top: 10vw;
  width: 25vw;
  display: flex;
  flex-direction: column;
`;

const CategoryButton = styled.button`
  padding: 0.5vw 1vw;
  margin-bottom: 0.5vw;
  font-size: 0.8vw;
  font-weight: 600;
  width: 8vw;
  border: none;
  border-radius: 1vw;
  background-color: #B8DD6D;
  color: white;
  cursor: pointer;
`;

const ResultCard = styled.div`
  padding: 1vw;
  margin-top: 1vw;
  border: 1px solid #ccc;
  border-radius: 0.7vw;
  background-color: #fff;
  font-size: 0.8vw;
  color: black;
`;






const MapPage = () => {

  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);

  const searchPlace = (keyword) => {
    if (!map || !window.kakao.maps.services) return;
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(`애견동반 ${keyword}`, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);
        const bounds = new window.kakao.maps.LatLngBounds();
        data.forEach((place) => {
          bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
        });
        map.setBounds(bounds);
      }
    });
  };

  return (
    <Container>

      <KakaoMap />

      <PlaceContainer>
          {/* <CategoryButton onClick={() => searchPlace("카페")}>카페</CategoryButton>
          <CategoryButton onClick={() => searchPlace("음식점")}>음식점</CategoryButton> */}

          {places.map((place, index) => (
            <ResultCard key={index}>
              <b>{place.place_name}</b><br />
              {place.road_address_name || place.address_name}<br />
              {place.phone}
            </ResultCard>
          ))}
      </PlaceContainer>
    </Container>
  );
};

export default MapPage;
