import React from 'react'
import styled from 'styled-components'
import '../css/LoadingScreen.css'

const LoaderContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: ${props => props.exitCondition ? 'none': 'flex'};
    align-items: center;
    justify-content: center;
    position: absolute;
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
