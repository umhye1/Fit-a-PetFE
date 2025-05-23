// components/MapPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Search from '../../assets/images/search1.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vw 5vw;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2vw;
`;

const MapSearch = styled.div`
  width: 37vw;
  height: 2.5vw;
  border: 0.1vw solid #CECAC5;
  border-radius: 1vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  border: none;
  font-size: 0.9vw;
  padding: 0 1vw;
  outline: none;
`;

const SearchImg = styled.img`
  width: 1.5vw;
  height: 1.5vw;
  cursor: pointer;
`;

const MapLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

const KakaoMapBox = styled.div`
  width: 50vw;
  height: 30vw;
  border-radius: 1vw;
  box-shadow: 0 0 1vw rgba(0, 0, 0, 0.1);
`;

const ResultList = styled.div`
  width: 30vw;
  padding-left: 2vw;
`;

const ResultCard = styled.div`
  padding: 1vw;
  margin-bottom: 1vw;
  border: 1px solid #ccc;
  border-radius: 0.7vw;
  background-color: #fff;
  font-size: 0.8vw;
  color: black;
  cursor: pointer;
`;

const FavoriteSection = styled.div`
  margin-top: 2vw;
`;

const FavoriteTitle = styled.h3`
  font-size: 1vw;
  margin-bottom: 1vw;
`;

const MapPage = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [places, setPlaces] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    const mapLoad = () => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const center = new window.kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        const mapInstance = new window.kakao.maps.Map(mapRef.current, { center, level: 3 });
        setMap(mapInstance);
        console.log("📌 지도 초기화 완료");
      });
    };

    if (window.kakao.maps.services) {
      mapLoad();
    } else {
      window.kakao.maps.load(() => {
        mapLoad();
      });
    }
  }, []);

  const clearMarkers = () => {
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
  };

  const handleSearch = () => {
    if (!searchInput || !window.kakao?.maps?.services || !map) return;

    const ps = new window.kakao.maps.services.Places();
    const keyword = `애견동반 ${searchInput}`;

    ps.keywordSearch(keyword, (data, status) => {
      if (status !== window.kakao.maps.services.Status.OK) {
        console.warn("검색 실패 또는 결과 없음");
        return;
      }

      clearMarkers();

      const bounds = new window.kakao.maps.LatLngBounds();
      const newMarkers = data.map((place) => {
        const position = new window.kakao.maps.LatLng(place.y, place.x);
        const marker = new window.kakao.maps.Marker({ position });
        marker.setMap(map);
        bounds.extend(position);
        return marker;
      });

      map.setBounds(bounds);
      setMarkers(newMarkers);
      setPlaces(data);
      console.log("✅ 검색 및 마커 표시 완료");
    });
  };

  const handleFavorite = (place) => {
    if (!favorites.find(f => f.id === place.id)) {
      setFavorites([...favorites, place]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(f => f.id !== id));
  };

  return (
    <Container>
      <SearchContainer>
        <MapSearch>
          <SearchInput
            type="text"
            placeholder="검색어를 입력하세요."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <SearchImg src={Search} alt="Search" onClick={handleSearch} />
        </MapSearch>
      </SearchContainer>

      <MapLayout>
        <KakaoMapBox ref={mapRef} id="map" />

        <ResultList>
          {places.map((place, idx) => (
            <ResultCard key={idx} onClick={() => map.setCenter(new window.kakao.maps.LatLng(place.y, place.x))}>
              <b>{place.place_name}</b><br />
              {place.road_address_name || place.address_name}<br />
              {place.phone}<br />
              <button onClick={(e) => { e.stopPropagation(); handleFavorite(place); }}>⭐ 즐겨찾기</button>
            </ResultCard>
          ))}

          {favorites.length > 0 && (
            <FavoriteSection>
              <FavoriteTitle>❤️ 즐겨찾기</FavoriteTitle>
              {favorites.map((fav, idx) => (
                <ResultCard key={idx} onClick={() => map.setCenter(new window.kakao.maps.LatLng(fav.y, fav.x))}>
                  <b>{fav.place_name}</b><br />
                  {fav.road_address_name || fav.address_name}<br />
                  {fav.phone}<br />
                  <button onClick={(e) => { e.stopPropagation(); removeFavorite(fav.id); }}>🗑 삭제</button>
                </ResultCard>
              ))}
            </FavoriteSection>
          )}
        </ResultList>
      </MapLayout>
    </Container>
  );
};

export default MapPage;
