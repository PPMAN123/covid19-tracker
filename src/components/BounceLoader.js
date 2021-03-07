import React from 'react';
import styled from 'styled-components';
import '../css/LoadingScreen.css';

const LoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  opacity: ${(props) => (props.exitCondition ? 0 : 1)};
  pointer-events: none;
  z-index: 10;
  background: white;
  transition: opacity 0.5s ease;
`;

const BounceLoader = ({ exitCondition }) => {
  return (
    <LoaderContainer exitCondition={exitCondition}>
      <div className="bouncer">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoaderContainer>
  );
};

export default BounceLoader;
