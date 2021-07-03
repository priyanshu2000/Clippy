import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import colors from '../constants/colors';
import Header from '../components/Header';
import Loader from '../components/Loader';
import AppText from '../components/AppText';
import Divider from '../components/Divider';
import AppInput from '../components/AppInput';
import BottomSheet from '../components/BottomSheet';
import DDPicker from '../components/DropDownPicker';
import ToastMessage from '../components/ToastMessage';
import FAB from '../components/buttons/FloatingActionButton';
import ActionButton from '../components/buttons/ActionButton';
import TextButton from '../components/buttons/TouchableTextButton';
import ListEmptyComponent from '../components/ListEmptyComponent';
import Dialogue from '../components/dialogues/Dialogue';
import { urlInfoParser, UUID } from '../utils';
import { CollectionContext } from '../utils/CollectionContext';
import { createCollection, getCollections, createArticle } from '../api';

const Home = ({ navigation }) => {
  const [collections, setCollections] = useContext(CollectionContext);

  useEffect(() => {
    onGetCollections();
  }, []);

  const onGetCollections = async () => {
    const response = await getCollections();
    setCollections(response);
  };

  const [loading, setLoading] = useState(false);

  const [articleUrl, setArticleUrl] = useState();
  const [collectionName, setCollectionName] = useState();

  const [selectedCollection, setSelectedCollection] = useState();

  const [isShowArticleDialogue, setShowArticleDialogue] = useState(false);
  const [isShowCollectionDialogue, setShowCollectionDialogue] = useState(false);

  const sheetRef = useRef();

  const onCreateCollection = async () => {
    if (collectionName) {
      const data = {
        collection_id: UUID(),
        collection_name: collectionName,
        data: [],
      };
      const response = await createCollection(data);
      setCollections(response);
      setCollectionName();
      setShowCollectionDialogue(false);
    } else {
      ToastMessage('error', 'Failed', 'Please enter collection name');
    }
  };

  const onCreateArticle = async () => {
    try {
      setLoading(true);
      const urlInfo = await urlInfoParser(articleUrl);
      const data = {
        collection_id: selectedCollection,
        article_id: UUID(),
        article_title: urlInfo.title,
        article_url: urlInfo.url,
        favicon_url: urlInfo.favicons[0],
        read: false,
      };
      const response = await createArticle(data);
      setCollections(response);
      setShowArticleDialogue(false);
      setLoading(false);
      setArticleUrl();
    } catch (e) {
      ToastMessage('error', 'Invalid', 'Entered URL is invalid');
      setLoading(false);
    }
  };

  const CollectionDialogue = () => (
    <Dialogue isOpen={isShowCollectionDialogue} heading="Create a Collection">
      <AppInput onChange={setCollectionName} heading="Collection name" />
      <View style={styles.actionButtonContainer}>
        <ActionButton
          title="Cancel"
          onPress={() => setShowCollectionDialogue(false)}
        />
        <ActionButton
          title="Create"
          color={colors.accent}
          titleColor={colors.white}
          onPress={() => {
            onCreateCollection();
          }}
        />
      </View>
    </Dialogue>
  );

  const ArticleDialogue = () => (
    <Dialogue isOpen={isShowArticleDialogue} heading="Create a Clip">
      <DDPicker
        heading="Collection"
        placeHolder="Select a collection"
        value={selectedCollection}
        setValue={setSelectedCollection}
        items={collections}
      />
      <AppInput heading="URL" onChange={setArticleUrl} />
      <View style={styles.actionButtonContainer}>
        <ActionButton
          title="Cancel"
          onPress={() => setShowArticleDialogue(false)}
        />
        <ActionButton
          title="Create"
          color={colors.accent}
          titleColor={colors.white}
          onPress={() => onCreateArticle()}
        />
      </View>
    </Dialogue>
  );

  const OptionBottomSheet = () => (
    <BottomSheet ref={sheetRef} height={125}>
      <TextButton
        title="Creat a Clip"
        color={colors.accent}
        onPress={() => setShowArticleDialogue(true)}
      />
      <TextButton
        title="Create a Collection"
        onPress={() => setShowCollectionDialogue(true)}
      />
    </BottomSheet>
  );

  const keyExtractor = (item) => item.collection_id;

  const renderCollectionList = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.collectionNameContainer}
        onPress={() =>
          navigation.navigate('ViewCollection', { collection: item })
        }>
        <AppText style={styles.collectionName}>{item.collection_name}</AppText>
        <>
          {item.data.length ? (
            item.data.slice(0, 3).map((article) => (
              <AppText
                key={article.article_id}
                numberOfLines={1}
                style={styles.articleNames}>
                {article.article_title}
              </AppText>
            ))
          ) : (
            <AppText style={styles.articleNames}>No clips!</AppText>
          )}
        </>
      </TouchableOpacity>
      <Divider />
    </View>
  );

  return (
    <View style={styles.container}>
      <Loader isShow={loading} />
      <Header />
      <FAB
        onPress={() =>
          collections.length
            ? sheetRef.current.openSheet()
            : setShowCollectionDialogue(true)
        }
      />
      <OptionBottomSheet />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.container}
        data={collections}
        keyExtractor={(item) => keyExtractor(item)}
        ListEmptyComponent={() => <ListEmptyComponent />}
        renderItem={(item) => renderCollectionList(item)}
      />
      {CollectionDialogue()}
      {ArticleDialogue()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bottomSheetOptionContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  collectionName: {
    fontFamily: 'Italic',
    fontSize: 17.5,
    textTransform: 'capitalize',
  },
  collectionNameContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  articleNames: {
    fontFamily: 'Italic',
    fontSize: 12.5,
    color: colors.grey,
    marginVertical: 3.5,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    marginTop: 3.5,
  },
});

export default Home;
