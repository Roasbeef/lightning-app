import React from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import MainContent from '../component/main-content';
import { Text } from '../component/text';
import { Background } from '../component/background';
import { Header, Title } from '../component/header';
import { Button, BackButton, GlasButton } from '../component/button';
import LightningBoltIcon from '../asset/icon/lightning-bolt';
import { color, font } from '../component/style';

//
// Seed (Mobile) View
//

const styles = StyleSheet.create({
  header: {
    height: 150,
  },
  title: {
    width: 200,
  },
  background: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: color.blackDark,
  },
  seed: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    paddingBottom: 10,
  },
});

const SeedView = ({ store, auth }) => (
  <Background image="purple-gradient-bg">
    <Header separator style={styles.header}>
      <BackButton onPress={() => auth.initPrevSeedPage()} />
      <Title
        style={styles.title}
        keepCase
        title="Write down each word and store it in a safe place."
      >
        <LightningBoltIcon height={35} width={29} />
      </Title>
      <Button disabled onPress={() => {}} />
    </Header>
    <MainContent style={styles.background}>
      <View style={styles.seed}>
        <WordList
          startingIndex={store.wallet.seedIndex}
          seedMnemonic={store.seedMnemonic.slice(
            store.wallet.seedIndex,
            store.wallet.seedIndex + 8
          )}
        />
        <Text style={styles.pagination}>
          {`${store.wallet.seedIndex + 8} of 24`}
        </Text>
      </View>
      <GlasButton onPress={() => auth.initNextSeedPage()}>Next</GlasButton>
    </MainContent>
  </Background>
);

SeedView.propTypes = {
  store: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

//
// Word List
//

const listStyles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    margin: 20,
  },
  words: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 700,
  },
});

const WordList = ({ seedMnemonic, startingIndex }) => (
  <View style={listStyles.wrapper}>
    <View style={listStyles.words}>
      {seedMnemonic.map((word, i) => (
        <Word word={word} index={startingIndex + i + 1} key={i} />
      ))}
    </View>
  </View>
);

WordList.propTypes = {
  seedMnemonic: PropTypes.array.isRequired,
  startingIndex: PropTypes.number,
};

//
// Word
//

const wordStyles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    height: 45,
    width: 115,
    margin: 10,
    borderWidth: 1,
    borderColor: color.seedBorder,
    backgroundColor: color.seedBackground,
  },
  word: {
    fontSize: font.sizeS * 1.2,
    paddingLeft: 10,
  },
});

const Word = ({ word, index }) => (
  <View style={wordStyles.wrapper}>
    <Text style={wordStyles.word}>
      {index}. {word}
    </Text>
  </View>
);

Word.propTypes = {
  word: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default observer(SeedView);
