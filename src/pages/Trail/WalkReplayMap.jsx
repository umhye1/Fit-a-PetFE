// WalkReplayMap.jsx
import React, { useEffect, useRef } from 'react';

const WalkReplayMap = ({ path }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao || !path || path.length === 0) return;

    window.kakao.maps.load(() => {
      const center = new window.kakao.maps.LatLng(path[0].lat, path[0].lng);
      const mapOption = { center, level: 4 };
      const map = new window.kakao.maps.Map(mapRef.current, mapOption);


      // Polyline 경로
      const linePath = path.map(p => new window.kakao.maps.LatLng(p.lat, p.lng));
      const polyline = new window.kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: '#9DBD5D',
        strokeOpacity: 0.9,
        strokeStyle: 'solid',
      });
      polyline.setMap(map);

      // 마커
      const marker = new window.kakao.maps.Marker({
        map,
        position: linePath[0],
      });

      // 마커 이동 애니메이션
      let i = 1;
      const moveMarker = () => {
        if (i >= linePath.length) return;
        marker.setPosition(linePath[i]);
        map.panTo(linePath[i]);
        i++;
        setTimeout(moveMarker, 800);
      };
      moveMarker();
      console.log("🚩 path[0]:", path[0]);
    });
  }, [path]);

  return (
    <div
      ref={mapRef}
      style={{ width: '27vw', height: '30vw', borderRadius: '1vw', boxShadow: '0 0 0.5vw rgba(0,0,0,0.1)' }}
    />
  );
};

export default WalkReplayMap;
