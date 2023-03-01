import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

export const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
`;

export const CardContainer = styled.div<{ flipped: boolean; matched: boolean }>`
  width: 100px;
  height: 150px;
  margin: 10px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  perspective: 1000px;
  transition: transform 0.3s;
  transform-style: preserve-3d;
  transform: ${(props) =>
    props.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
  
  &.matched {
    background-color: #b3ffb3;
  }

  .front,
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    font-weight: bold;
    color: #333;
  }

  .front {
    transform: rotateY(180deg);
  }
`;
