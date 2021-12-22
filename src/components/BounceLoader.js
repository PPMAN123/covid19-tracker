import React from 'react';
import styled from 'styled-components';
import '../css/LoadingScreen.css';
import { useTheme } from '@material-ui/core/styles';

const LoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  opacity: ${(props) => (props.exitCondition ? 0 : 1)};
  pointer-events: none;
  z-index: 10;
  left: 0;
  background: ${(props) => props.theme.palette.background.default};
  transition: opacity 0.5s ease;
`;

const BounceLoader = ({ exitCondition }) => {
  const theme = useTheme();
  return (
    <LoaderContainer exitCondition={exitCondition} theme={theme}>
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
