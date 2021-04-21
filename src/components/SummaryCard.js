import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import { cloneDeep } from 'lodash';
import Switch from '@material-ui/core/Switch';
import { useSwitch } from '../context/SwitchContext';

const useStyles = makeStyles((theme) => ({
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
}));

const ChangeText = styled.div`
  color: ${(props) => (props.positive ? 'green' : 'red')};
  margin-left: 6px;
  font-size: 14px;
  flex-direction: row;
  display: flex;
  align-items: center;
`;

const SummaryCard = ({
  amount,
  secondaryAmount,
  title,
  description,
  toggleRequired,
  toggledAmount,
  toggledDescription,
  toggleTo,
  children,
  secondaryToggleAmount,
}) => {
  const c = useStyles();
  const [amountItems, setAmountItems] = useState([]);
  const [secondaryAmountItems, setSecondaryAmountItems] = useState([]);
  const [currentAmount, setCurrentAmount] = useState(amount);
  const [hasChanged, changeHasChanged] = useState(false);
  const [currentSecondaryAmount, setCurrentSecondaryAmount] = useState(
    secondaryAmount
  );
  const [toggledBack, setToggledBack] = useState(false);
  const { switchState, setSwitchState } = useSwitch();

  useEffect(() => {
    setCurrentSecondaryAmount(secondaryToggleAmount);
  }, [secondaryToggleAmount]);

  useEffect(() => {
    setCurrentAmount(amount);
  }, [amount]);

  useEffect(() => {
    if (hasChanged && toggledBack) {
      setCurrentSecondaryAmount(
        `${new Intl.NumberFormat('en-US', {
          signDisplay: 'always',
        }).format(secondaryToggleAmount)}`
      );
    } else {
      setCurrentSecondaryAmount(
        `${new Intl.NumberFormat('en-US', {
          signDisplay: 'always',
        }).format(secondaryAmount)}`
      );
    }
  }, [hasChanged, toggledBack]);

  useEffect(() => {
    if (switchState) {
      setCurrentAmount(toggledAmount);
      changeHasChanged(true);
      setToggledBack(true);
    } else {
      setCurrentAmount(amount);
      setToggledBack(false);
    }
  }, [switchState]);

  useEffect(() => {
    if (currentAmount) {
      const amountString = `${new Intl.NumberFormat().format(currentAmount)}`;
      setAmountItems([
        {
          key: 0,
          text: amountString[0],
        },
      ]);
    }
  }, [currentAmount]);

  useEffect(() => {
    if (currentAmount) {
      const amountString = `${new Intl.NumberFormat().format(currentAmount)}`;
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
    if (currentAmount) {
      const amountString = `${new Intl.NumberFormat().format(currentAmount)}`;
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
        }, 100);
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
        {switchState ? (
          <Typography className={c.title}>{toggleTo}</Typography>
        ) : (
          <Typography className={c.title}>{title}</Typography>
        )}
        <Typography className={c.amountText}>
          {hasChanged ? (
            <React.Fragment>
              {`${new Intl.NumberFormat().format(currentAmount)}`}
              <ChangeText positive={secondaryAmount && secondaryAmount >= 0}>
                {currentSecondaryAmount}
              </ChangeText>
            </React.Fragment>
          ) : (
            <React.Fragment>
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
            </React.Fragment>
          )}
        </Typography>
        {switchState ? (
          <Typography className={c.descriptionText}>
            {toggledDescription}
          </Typography>
        ) : (
          <Typography className={c.descriptionText}>{description}</Typography>
        )}
        {toggleRequired && children && (
          <React.Fragment>
            {children[0]}
            <Typography component="span" className={c.descriptionText}>
              {toggleTo}
            </Typography>
          </React.Fragment>
        )}
        {children && children[1]}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
