import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { createStyles, maxWidth } from '../component/media-query';
import Background from '../component/background';
import MainContent from '../component/main-content';
import { NamedField } from '../component/field';
import { Header, Title } from '../component/header';
import {
  BackButton,
  CopyButton,
  Button,
  ButtonText,
} from '../component/button';
import {
  BalanceLabel,
  BalanceLabelNumeral,
  BalanceLabelUnit,
} from '../component/label';
import Card from '../component/card';
import QRCode from '../component/qrcode';
import { CopiedNotification } from '../component/notification';
import CopyPurpleIcon from '../asset/icon/copy-purple';
import LightningBoltIcon from '../asset/icon/lightning-bolt';
import { color, font, breakWidth, smallBreakWidth } from '../component/style';

const baseStyles = {
  card: {
    paddingBottom: 0,
    paddingLeft: 50,
    paddingRight: 50,
  },
  balance: {
    marginTop: 25,
    marginBottom: 25,
  },
  numeral: {
    color: color.blackText,
  },
  unit: {
    color: color.blackText,
  },
  qrcode: {
    margin: 40,
  },
  note: {},
  copyBtn: {
    alignSelf: 'stretch',
  },
  doneBtn: {
    marginTop: 10,
  },
  doneBtnText: {
    color: color.purple,
  },
};

const styles = createStyles(
  baseStyles,

  maxWidth(breakWidth, {
    balance: {
      marginTop: 0,
      marginBottom: 15,
    },
    note: {
      marginLeft: 10,
      marginRight: 10,
    },
  }),

  maxWidth(smallBreakWidth, {
    card: {
      paddingTop: 0,
    },
    balance: {
      marginTop: 10,
      marginBottom: 0,
    },
    numeral: {
      fontSize: font.sizeXXL,
      lineHeight: font.lineHeightXXL,
    },
    qrcode: {
      padding: 10,
      margin: 20,
    },
    note: {
      alignSelf: 'center',
      width: 300,
    },
    copyBtn: {
      alignSelf: 'center',
      width: 300,
    },
    doneBtn: {
      marginTop: 0,
    },
  })
);

const InvoiceQRView = ({ store, nav, invoice }) => (
  <Background image="purple-gradient-bg">
    <Header shadow color={color.purple}>
      <BackButton onPress={() => nav.goInvoice()} />
      <Title title="Payment Request">
        <LightningBoltIcon height={12} width={6.1} />
      </Title>
      <Button disabled onPress={() => {}} />
    </Header>
    <MainContent>
      <Card style={styles.card}>
        <BalanceLabel style={styles.balance}>
          <BalanceLabelNumeral style={styles.numeral}>
            {store.invoiceAmountLabel}
          </BalanceLabelNumeral>
          <BalanceLabelUnit style={styles.unit}>
            {store.unitLabel}
          </BalanceLabelUnit>
        </BalanceLabel>
        <NamedField style={styles.note} name="Note">
          {store.invoice.note}
        </NamedField>
        <QRCode style={styles.qrcode}>{store.invoice.uri}</QRCode>
        <CopyButton
          onPress={() => invoice.toClipboard({ text: store.invoice.encoded })}
          icon={<CopyPurpleIcon height={17.5} width={14} />}
          style={styles.copyBtn}
        >
          {store.invoice.encoded}
        </CopyButton>
        <Button onPress={() => nav.goHome()} style={styles.doneBtn}>
          <ButtonText style={styles.doneBtnText}>DONE</ButtonText>
        </Button>
      </Card>
      <CopiedNotification
        display={store.displayCopied}
        color={color.notifyDark}
      />
    </MainContent>
  </Background>
);

InvoiceQRView.propTypes = {
  store: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
};

export default observer(InvoiceQRView);
