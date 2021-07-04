import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import FAB from '../components/buttons/FloatingActionButton';
import Divider from '../components/Divider';
import Header from '../components/Header';
import colors from '../constants/colors';
import Dialogue from '../components/dialogues/Dialogue';
import DDPicker from '../components/DropDownPicker';
import AppInput from '../components/AppInput';
import ActionButton from '../components/buttons/ActionButton';
import BottomSheet from '../components/BottomSheet';
import TextButton from '../components/buttons/TouchableTextButton';
import ListEmptyComponent from '../components/ListEmptyComponent';
import {
  deleteArticle,
  editCollection,
  deleteCollection,
  markAsReadArticle,
  getArticles,
  createArticle,
  editArticle,
} from '../api';
import {openInBrowser, urlInfoParser, UUID} from '../utils';
import {CollectionContext} from '../utils/CollectionContext';
import ToastMessage from '../components/ToastMessage';
import Loader from '../components/Loader';
import ConfirmActionDialogue from '../components/dialogues/ConfirmActionDialogue';
import AppText from '../components/AppText';

const ViewCollection = ({route, navigation}) => {
  const {collection} = route.params;

  const [collections, setCollections] = useContext(CollectionContext);

  useEffect(() => {
    onGetArticles();
  }, [collections]);

  const onGetArticles = async () => {
    const response = await getArticles(collection.collection_id);
    setArticles(response);
  };

  const [loading, setLoading] = useState(false);

  const [articles, setArticles] = useState();

  const [articleUrl, setArticleUrl] = useState();
  const [collectionName, setCollectionName] = useState(
    collection.collection_name,
  );

  const [selectedArticle, setSelectedArticle] = useState();
  const [selectedCollection, setSelectedCollection] = useState(
    collection.collection_id,
  );

  const [isShowArticleDialogue, setShowArticleDialogue] = useState(false);
  const [isShowEditArticleDialogue, setShowEditArticleDialogue] =
    useState(false);
  const [isShowEditCollectionDialogue, setShowEditCollectionDialogue] =
    useState(false);

  const [isShowDeleteArticleDialogue, setShowDeleteArticleDialogue] =
    useState(false);
  const [isShowDeleteCollectionDialogue, setShowDeleteCollectionDialogue] =
    useState(false);

  const sheetRef = useRef();

  const onEditCollection = async () => {
    if (collectionName) {
      const data = {
        collection_id: collection.collection_id,
        collection_name: collectionName,
      };
      const response = await editCollection(data);
      setCollections(response);
      setShowEditCollectionDialogue(false);
    } else {
      ToastMessage('error', 'Failed', 'Please enter collection name');
    }
  };

  const onDeleteCollection = async () => {
    const data = {collection_id: collection.collection_id};
    const response = await deleteCollection(data);
    setCollections(response);
    navigation.goBack();
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
    } catch (e) {
      ToastMessage('error', 'Invalid', 'Entered URL is invalid');
      setLoading(false);
    }
  };

  const onMarkAsRead = async () => {
    const data = {
      collection_id: collection.collection_id,
      article_id: selectedArticle.article_id,
      read: true,
    };
    const response = await markAsReadArticle(data);
    setCollections(response);
  };

  const onEditArticle = async () => {
    const data = {
      collection_id: collection.collection_id,
      selected_collection: selectedCollection,
      selected_article: selectedArticle,
    };
    const response = await editArticle(data);
    setCollections(response);
    setShowEditArticleDialogue(false);
  };

  const onDeleteArticle = async () => {
    const data = {
      collection_id: collection.collection_id,
      article_id: selectedArticle.article_id,
    };
    const response = await deleteArticle(data);
    setCollections(response);
  };

  const EditCollectionDialogue = () => (
    <Dialogue isOpen={isShowEditCollectionDialogue} heading="Edit collection">
      <AppInput
        heading="Collection name"
        value={collectionName}
        onChange={setCollectionName}
      />
      <View style={styles.actionButtonContainer}>
        <ActionButton
          title="Cancel"
          onPress={() => setShowEditCollectionDialogue(false)}
        />
        <ActionButton
          title="Create"
          color={colors.accent}
          titleColor={colors.white}
          onPress={() => onEditCollection()}
        />
      </View>
    </Dialogue>
  );

  const ArticleDialogue = () => (
    <Dialogue isOpen={isShowArticleDialogue} heading="Create a Clip">
      <DDPicker
        heading="Collection"
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

  const EditArticleDialogue = () => (
    <Dialogue heading="Create a Clip">
      <DDPicker
        heading="Collection"
        value={selectedCollection}
        setValue={setSelectedCollection}
        items={collections}
      />
      <AppInput
        heading="URL"
        onChange={setArticleUrl}
        value={selectedArticle.article_url}
        isEditable={false}
      />
      <View style={styles.actionButtonContainer}>
        <ActionButton
          title="Cancel"
          onPress={() => setShowEditArticleDialogue(false)}
        />
        <ActionButton
          title="Save"
          color={colors.accent}
          titleColor={colors.white}
          onPress={() => onEditArticle()}
        />
      </View>
    </Dialogue>
  );

  const OptionBottomSheet = () => (
    <BottomSheet ref={sheetRef} height={200}>
      <TextButton
        title="Open in Browser"
        color={colors.accent}
        onPress={() => openInBrowser(selectedArticle.article_url)}
      />
      <TextButton title="Mark as read" onPress={() => onMarkAsRead()} />
      <TextButton
        title="Edit"
        onPress={() => setShowEditArticleDialogue(true)}
      />
      <TextButton
        title="Delete"
        onPress={() => setShowDeleteArticleDialogue(true)}
      />
    </BottomSheet>
  );

  const keyExtractor = (item) => item.article_id;

  const renderArticleList = ({item}) => (
    <View>
      <TouchableOpacity
        onPress={() => openInBrowser(item.article_url)}
        onLongPress={() => {
          sheetRef.current.openSheet();
          setSelectedArticle(item);
        }}
        style={styles.collectionNameContainer}>
        <Image source={{uri: item.favicon_url}} style={styles.favicon} />
        <AppText numberOfLines={1} style={styles.collectionName}>
          {item.article_title}
        </AppText>
      </TouchableOpacity>
      <Divider />
    </View>
  );

  return (
    <View style={styles.container}>
      <Loader isShow={loading} />
      <Header
        isShowIcons
        isShowBack
        right={
          <View style={styles.headerIconContainer}>
            <TouchableOpacity
              style={styles.Icon}
              onPress={() => setShowEditCollectionDialogue(true)}>
              <Icon name="edit-line" size={22} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Icon}
              onPress={() => setShowDeleteCollectionDialogue(true)}>
              <Icon name="delete-bin-4-line" size={22} color={colors.white} />
            </TouchableOpacity>
          </View>
        }
      />
      <FAB onPress={() => setShowArticleDialogue(true)} />
      <SectionList
        sections={articles}
        keyExtractor={(item) => keyExtractor(item)}
        renderSectionHeader={({section: {type}}) => (
          <View style={styles.sectionHeaderContainer}>
            {type === 'Read' && (
              <AppText style={styles.sectionHeader}>{type}</AppText>
            )}
          </View>
        )}
        ListEmptyComponent={() => <ListEmptyComponent />}
        renderItem={(item) => renderArticleList(item)}
      />
      <OptionBottomSheet />
      <ConfirmActionDialogue
        isOpen={isShowDeleteArticleDialogue}
        heading="Are you sure you want to Delete?"
        onCancel={() => setShowDeleteArticleDialogue(false)}
        onConfirm={() => {
          onDeleteArticle();
          setShowDeleteArticleDialogue(false);
        }}
      />
      <ConfirmActionDialogue
        isOpen={isShowDeleteCollectionDialogue}
        heading="Are you sure you want to Delete?"
        onCancel={() => setShowDeleteCollectionDialogue(false)}
        onConfirm={() => onDeleteCollection()}
      />
      {EditCollectionDialogue()}
      {ArticleDialogue()}
      {isShowEditArticleDialogue && EditArticleDialogue()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerIconContainer: {
    flexDirection: 'row',
  },
  Icon: {
    margin: 10,
  },
  sectionHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    fontSize: 17.5,
    color: colors.grey,
    marginVertical: 20,
  },
  collectionName: {
    fontSize: 15,
    width: '90%',
    color: colors.grey,
  },
  collectionNameContainer: {
    width: '100%',
    paddingVertical: 17.5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleNames: {
    fontSize: 12.5,
    marginTop: 5,
    color: colors.black,
  },
  bottomSheetOptionContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  bottomSheetOptionText: {
    fontSize: 17.5,
  },
  favicon: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    marginTop: 3.5,
  },
});

export default ViewCollection;
