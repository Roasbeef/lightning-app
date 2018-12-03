import React from 'react';
import { KeyboardAvoidingView, Dimensions } from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { createStyles, maxWidth } from '../component/media-query';
import Background from '../component/background';
import MainContent from '../component/main-content';
import { InputField, AmountInputField } from '../component/field';
import { Header, Title } from '../component/header';
import { CancelButton, PillButton, Button } from '../component/button';
import { BalanceLabel, BalanceLabelUnit } from '../component/label';
import Card from '../component/card';
import LightningBoltIcon from '../asset/icon/lightning-bolt';
import { FormStretcher, FormSubText } from '../component/form';
import { color, font, breakWidth, smallBreakWidth } from '../component/style';

const baseStyles = {
  contentWrapper: {
    flex: 1,
  },
  card: {
    paddingLeft: 50,
    paddingRight: 50,
  },
  balance: {
    marginTop: 40,
  },
  unit: {
    color: color.blackText,
  },
  subText: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  amountInput: {},
  form: {},
  input: {},
  nextBtn: {},
};

const styles = createStyles(
  baseStyles,

  maxWidth(breakWidth, {
    balance: {
      marginTop: 0,
    },
    amountInput: {
      lineHeight: 95,
    },
    unit: {
      lineHeight: font.lineHeightXXXL,
      paddingRight: 20,
      paddingBottom: 30,
    },
    input: {
      lineHeight: font.lineHeightM + 5,
    },
    subText: {
      paddingLeft: 25,
      paddingRight: 25,
    },
  }),

  maxWidth(smallBreakWidth, {
    amountInput: {
      lineHeight: 45,
      fontSize: font.sizeXXL,
    },
    unit: {
      marginLeft: 5,
      paddingRight: 25,
      paddingBottom: 10,
    },
    form: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    subText: {
      width: 300,
      paddingTop: 10,
      paddingBottom: 10,
    },
    nextBtn: {
      alignSelf: 'center',
      width: 300,
    },
  })
);

const InvoiceView = ({ store, nav, invoice }) => (
  <Background image="purple-gradient-bg">
    <Header shadow color={color.purple}>
      <Button disabled onPress={() => {}} />
      <Title title="Payment Request">
        <LightningBoltIcon height={12} width={6.1} />
      </Title>
      <CancelButton onPress={() => nav.goHome()} />
    </Header>
    <KeyboardAvoidingView style={styles.contentWrapper} behavior="padding">
      <MainContent>
        <Card style={styles.card}>
          <BalanceLabel style={styles.balance}>
            <AmountInputField
              style={styles.amountInput}
              charWidth={
                Dimensions.get('window').width < smallBreakWidth ? 26 : 46
              }
              autoFocus={true}
              value={store.invoice.amount}
              onChangeText={amount => invoice.setAmount({ amount })}
              onSubmitEditing={() => invoice.generateUri()}
            />
            <BalanceLabelUnit style={styles.unit}>
              {store.unitFiatLabel}
            </BalanceLabelUnit>
          </BalanceLabel>
          <FormStretcher style={styles.form}>
            <InputField
              style={styles.input}
              placeholder="Note"
              value={store.invoice.note}
              onChangeText={note => invoice.setNote({ note })}
              onSubmitEditing={() => invoice.generateUri()}
            />
          </FormStretcher>
          <FormSubText style={styles.subText}>
            Generate a payment request that others can use to pay you
            immediately via the Lightning Network.
          </FormSubText>
          <PillButton
            style={styles.nextBtn}
            onPress={() => invoice.generateUri()}
          >
            Next
          </PillButton>
        </Card>
      </MainContent>
    </KeyboardAvoidingView>
  </Background>
);

InvoiceView.propTypes = {
  store: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
};

export default observer(InvoiceView);
