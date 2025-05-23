import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaDog, FaCat } from 'react-icons/fa';

import RoomBackground from '../../assets/images/pet-room1.png';
import DogImage from '../../assets/images/pet-dog.png';
import CatImage from '../../assets/images/pet-cat.png';
import CatSleep from '../../assets/images/CatSleep.png';
import DogSleep from '../../assets/images/DogSleep.png';
import BedImage from '../../assets/images/pet-bed.png';
import ToyImage from '../../assets/images/pet-toy.png';
import BowlImage from '../../assets/images/bowl.png';

const moveLegs = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(15deg); }
  100% { transform: rotate(0deg); }
`;

const floatEmoji = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-30px); opacity: 0; }
`;

const Room = styled.div`
  position: relative;
  width: 80vw;
  height: 75vh;
  margin: 2vw auto;
  background-image: url(${RoomBackground});
  background-size: cover;
  border: 1px solid #aaa;
  border-radius: 20px;
  overflow: hidden;
`;

const Pet = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== 'isMoving',
})`
  position: absolute;
  width: 13vw;
  height: 13vw;
  transition: all 1.2s ease-in-out;
  ${(props) =>
    props.isMoving &&
    css`
      animation: ${moveLegs} 0.4s infinite;
    `}
`;

const Emoji = styled.div`
  position: absolute;
  font-size: 1.5rem;
  animation: ${floatEmoji} 1s ease-in-out forwards;
  pointer-events: none;
`;

const FurnitureBed = styled.img`
  position: absolute;
  width: 20vw;
  height: 20vw;
  cursor: pointer;
`;

const FurnitureBowl = styled.img`
  position: absolute;
  width: 10vw;
  height: 10vw;
  cursor: pointer;
`;

const FurnitureToy = styled.img`
  position: absolute;
  width: 8vw;
  height: 8vw;
  cursor: pointer;
`;

const ControlPanel = styled.div`
  width: 90vw;
  margin: 1vw auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.button`
  background-color: #B8DD6D;
  color: #fff;
  padding: 1vw 3vw;
  font-size: 1vw;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: #2E2923;
  font-size: 1vw;
  font-weight: 700;

  &:hover {
    background: #99CC31;
  }
`;

const MyPetRoom = () => {
  const [pet, setPet] = useState(null);
  const [furnitures, setFurnitures] = useState([]);
  const [selectedFurnitureType, setSelectedFurnitureType] = useState(null);
  const [clickCounts, setClickCounts] = useState({});
  const [emojis, setEmojis] = useState([]);

  const bedPosition = { x: 850, y: 360 };
  const foodBowlPosition = { x: 300, y: 480 };

  const togglePet = (type) => {
    if (pet && pet.id === type) {
      setPet(null);
    } else {
      setPet({
        id: type,
        image: type === 'dog' ? DogImage : CatImage,
        sleepImage: type === 'dog' ? DogSleep : CatSleep,
        x: 300,
        y: 100,
        isMoving: false,
      });
    }
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const handleRoomClick = (e) => {
    const room = e.currentTarget;
    const rect = room.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const roomWidth = room.clientWidth;
    const roomHeight = room.clientHeight;

    const maxPetX = roomWidth - roomWidth * 0.13;
    const maxPetY = roomHeight - roomWidth * 0.13;
    const clampedX = clamp(x, 0, maxPetX);
    const clampedY = clamp(y, 0, maxPetY);

    if (selectedFurnitureType) {
      const id = Date.now();
      const toySize = roomWidth * 0.08;
      const maxToyX = roomWidth - toySize;
      const maxToyY = roomHeight - toySize;
      const safeX = clamp(x, 0, maxToyX);
      const safeY = clamp(y, 0, maxToyY);

      const newFurniture = {
        id,
        src: ToyImage,
        type: 'toy',
        left: safeX + 'px',
        top: safeY + 'px',
        x: safeX,
        y: safeY,
      };
      setFurnitures([...furnitures, newFurniture]);
      setSelectedFurnitureType(null);
    } else if (pet) {
      const nearBed = Math.abs(bedPosition.x - x) < 80 && Math.abs(bedPosition.y - y) < 80;
      const nearBowl = Math.abs(foodBowlPosition.x - x) < 80 && Math.abs(foodBowlPosition.y - y) < 80;
      const nearToy = furnitures.find(f => f.type === 'toy' && Math.abs(f.x - x) < 80 && Math.abs(f.y - y) < 80);

      if (nearBowl) setEmojis(e => [...e, { id: Date.now(), x: pet.x + 20, y: pet.y - 10, icon: '❤️' }]);
      if (nearToy) setEmojis(e => [...e, { id: Date.now(), x: pet.x + 20, y: pet.y - 10, icon: '🎵' }]);

      setPet({
        ...pet,
        x: clampedX,
        y: clampedY,
        image: nearBed ? pet.sleepImage : (pet.id === 'dog' ? DogImage : CatImage),
        isMoving: true,
      });

      setTimeout(() => {
        setPet(prev => (prev ? { ...prev, isMoving: false } : null));
      }, 1200);
    }
  };

  const handleFurnitureClick = (id, type) => {
    setClickCounts(prev => {
      const count = (prev[id] || 0) + 1;
      if (count >= 2) {
        setFurnitures(prevFurn => prevFurn.filter(f => f.id !== id));
        return { ...prev, [id]: 0 };
      }
      return { ...prev, [id]: count };
    });
  };

  return (
    <>
      <Room onClick={handleRoomClick}>
        <FurnitureBed
          src={BedImage}
          style={{ left: bedPosition.x + 'px', top: bedPosition.y + 'px' }}
        />
        <FurnitureBowl
          src={BowlImage}
          style={{ left: foodBowlPosition.x + 'px', top: foodBowlPosition.y + 'px' }}
        />
        {pet && (
          <Pet
            key={pet.image}
            src={pet.image}
            alt={pet.id}
            isMoving={pet.isMoving}
            style={{ left: pet.x + 'px', top: pet.y + 'px' }}
          />
        )}
        {furnitures.map(f => (
          f.type === 'toy' && (
            <FurnitureToy
              key={f.id}
              src={f.src}
              style={{ left: f.left, top: f.top }}
              onClick={(e) => {
                e.stopPropagation();
                handleFurnitureClick(f.id, f.type);
              }}
            />
          )
        ))}
        {emojis.map(e => (
          <Emoji key={e.id} style={{ left: e.x + 'px', top: e.y + 'px' }}>{e.icon}</Emoji>
        ))}
      </Room>

      <ControlPanel>
        <Button onClick={() => togglePet('dog')}>강아지</Button>
        <Button onClick={() => togglePet('cat')}>고양이</Button>
        <Button onClick={() => setSelectedFurnitureType('toy')}>장난감 두기</Button>
      </ControlPanel>
    </>
  );
};

export default MyPetRoom;
