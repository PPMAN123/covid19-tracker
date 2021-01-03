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
        fontWeight: 'bold'
    },
    card: {
        width: 400,
        height: 250
    }
})

const SummaryCard = ({ amount, title, description }) => {
    const c = useStyles()
    return (
        <Card className={c.card}>
            <CardContent>
                <Typography className={c.title}>
                    { title }
                </Typography>
                <Typography className={c.Typography}>
                    { new Intl.NumberFormat().format(amount) }
                </Typography>
                <Typography className={c.descriptionText}>
                    { description }
                </Typography>
            </CardContent>
        </Card>
    )
}

export default SummaryCard
