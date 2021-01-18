import React from 'react'
import { Card, CardContent, CardActions, Typography, makeStyles } from '@material-ui/core'
import styled from 'styled-components'

const useStyles = makeStyles({
    title: {
        color: 'grey',
        fontSize: 18,
    },
    Typography: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: '10px 0px'
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        width: 'min(100vw, 400px)',
        height: 250
    }
})


const ChangeText = styled.span`
    color: ${props => props.positive ? 'green' : 'red'};
    margin-left: 6px;
    font-size: 14px;
`

const SummaryCard = ({ amount, secondaryAmount, title, description }) => {
    const c = useStyles()
    return (
        <Card className={c.card}>
            <CardContent>
                <Typography className={c.title}>
                    { title }
                </Typography>
                <Typography className={c.Typography}>
                    { new Intl.NumberFormat().format(amount) }
                    <ChangeText positive={secondaryAmount && secondaryAmount >= 0}>
                        { new Intl.NumberFormat('en-US', {signDisplay: 'always'}).format(secondaryAmount || 0)}
                    </ChangeText>
                </Typography>
                <Typography className={c.descriptionText}>
                    { description }
                </Typography>
            </CardContent>
        </Card>
    )
}

export default SummaryCard
