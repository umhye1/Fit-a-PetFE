import React, { useEffect, useRef } from 'react';

const WalkReplayMap = ({ path }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao || !path || path.length === 0) return;

    window.kakao.maps.load(() => {
      const kakao = window.kakao;
      const center = new kakao.maps.LatLng(path[0].lat, path[0].lng);
      const map = new kakao.maps.Map(mapRef.current, {
        center,
        level: 4,
      });

      // 초기 마커
      const marker = new kakao.maps.Marker({
        map,
        position: center,
      });

      // Polyline 초기화 (빈 경로)
      const polyline = new kakao.maps.Polyline({
        path: [center],
        strokeWeight: 5,
        strokeColor: '#FF4A65',
        strokeOpacity: 0.9,
        strokeStyle: 'solid',
      });
      polyline.setMap(map);

      // 마커 이동 및 선 경로 누적
      let i = 1;
      const moveMarker = () => {
        if (i >= path.length) return;

        const nextPosition = new kakao.maps.LatLng(path[i].lat, path[i].lng);
        marker.setPosition(nextPosition);
        map.panTo(nextPosition);

        const currentPath = polyline.getPath();
        currentPath.push(nextPosition); // 경로 추가
        polyline.setPath(currentPath); // 경로 갱신

        i++;
        setTimeout(moveMarker, 800);
      };

      moveMarker();
    });
  }, [path]);

  return (
    <div
      ref={mapRef}
      style={{ width: '28vw', height: '42vw', borderRadius: '1vw', boxShadow: '0 0 0.5vw rgba(0,0,0,0.1)' }}
    />
  );
};

export default WalkReplayMap;
