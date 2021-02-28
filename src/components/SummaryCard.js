import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import { cloneDeep } from 'lodash';

const useStyles = makeStyles({
  title: {
    color: 'grey',
    fontSize: 18,
  },
  Typography: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: '10px 0px',
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    height: 250,
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
  },
});

const ChangeText = styled.div`
  color: ${(props) => (props.positive ? 'green' : 'red')};
  margin-left: 6px;
  font-size: 14px;
  flex-direction: row;
  display: flex;
  align-items: center;
`;

const SummaryCard = ({ amount, secondaryAmount, title, description }) => {
  const c = useStyles();
  const [amountItems, setAmountItems] = useState([]);
  const [secondaryAmountItems, setSecondaryAmountItems] = useState([]);

  useEffect(() => {
    if (amount) {
      const amountString = `${new Intl.NumberFormat().format(amount)}`;
      setAmountItems([
        {
          key: 0,
          text: amountString[0],
        },
      ]);
    }
  }, [amount]);

  useEffect(() => {
    if (amount) {
      const amountString = `${new Intl.NumberFormat().format(amount)}`;
      if (amountItems.length > 0 && amountItems.length < amountString.length) {
        setTimeout(() => {
          setAmountItems((prevAmountItems) => {
            const newAmountItems = cloneDeep(prevAmountItems);
            newAmountItems.push({
              text: amountString[newAmountItems.length],
              key: newAmountItems.length,
            });
            return newAmountItems;
          });
        }, 250);
      }
    }
  }, [amountItems]);

  useEffect(() => {
    if (amount) {
      const amountString = `${new Intl.NumberFormat().format(amount)}`;
      if (amountItems.length > 0 && amountItems.length == amountString.length) {
        const secondaryAmountString = `${new Intl.NumberFormat('en-US', {
          signDisplay: 'always',
        }).format(secondaryAmount || 0)}`;
        setSecondaryAmountItems([
          {
            key: 0,
            text: secondaryAmountString[0],
          },
        ]);
      }
    }
  }, [amountItems]);

  useEffect(() => {
    if (secondaryAmount) {
      const secondaryAmountString = `${new Intl.NumberFormat('en-US', {
        signDisplay: 'always',
      }).format(secondaryAmount || 0)}`;
      if (
        secondaryAmountItems.length > 0 &&
        secondaryAmountItems.length < secondaryAmountString.length
      ) {
        setTimeout(() => {
          setSecondaryAmountItems((prevAmountItems) => {
            const newAmountItems = cloneDeep(prevAmountItems);
            newAmountItems.push({
              text: secondaryAmountString[newAmountItems.length],
              key: newAmountItems.length,
            });
            return newAmountItems;
          });
        }, 250);
      }
    }
  }, [secondaryAmountItems]);

  const transitions = useTransition(amountItems, (item) => item.key, {
    from: { transform: 'translate3d(0,-40px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,-40px,0)', opacity: 0 },
  });

  const secondaryTransitions = useTransition(
    secondaryAmountItems,
    (item) => item.key,
    {
      from: { transform: 'translate3d(0,-40px,0)', opacity: 0 },
      enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
      leave: { transform: 'translate3d(0,-40px,0)', opacity: 0 },
    }
  );
  return (
    <Card className={c.card}>
      <CardContent>
        <Typography className={c.title}>{title}</Typography>
        <Typography className={c.amountText}>
          {transitions.map(({ item, props, key }) => (
            <animated.div key={key} style={props}>
              {item.text}
            </animated.div>
          ))}
          <ChangeText positive={secondaryAmount && secondaryAmount >= 0}>
            {secondaryTransitions.map(({ item, props, key }) => (
              <animated.div key={key} style={props}>
                {item.text}
              </animated.div>
            ))}
          </ChangeText>
        </Typography>
        <Typography className={c.descriptionText}>{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
