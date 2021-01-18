import React from 'react'
import styled from 'styled-components'
import '../css/LoadingScreen.css'

const LoaderContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    opacity: ${props => props.exitCondition ? 0 : 1};
    z-index ${props => props.exitCondition ? -1 : 0};
    pointer-events: none;
`

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
    )
}

export default BounceLoader
