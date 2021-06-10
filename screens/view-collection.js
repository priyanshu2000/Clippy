import React,{ useState, useEffect, useRef, useContext } from 'react'
import { View, Text,Image, StyleSheet, TouchableOpacity, SectionList } from 'react-native'
import { Icons } from '../assets/icons';
import FAB from '../components/buttons/floating-action-button';
import Divider from '../components/divider';
import Header from '../components/header';
import colors from '../constants/colors';
import Dialogue from '../components/dialogue';
import DDPicker from '../components/drop-down-picker';
import AppInput from '../components/app-input';
import ActionButton from '../components/buttons/action-button';
import BottomSheet from '../components/bottom-sheet';
import TextButton from '../components/buttons/touchable-text-button';
import ListEmptyComponent from '../components/list-empty-component';
import { deleteArticle, editCollection, deleteCollection, getCollections, markAsReadArticle, getArticles, createArticle, editArticle, } from '../api';
import { openInBrowser, urlInfoParser, UUID } from '../utils';
import { CollectionContext } from '../utils/context'
import ToastMessage from '../components/toast-message';
import Loader from '../components/loader';

const ViewCollection = ({ route, navigation }) => {

    const { collection } = route.params

    useEffect( async () => {
        const response = await getArticles(collection.collection_id)
        setArticles(response)
    }, [])

    const [collections, setCollections] = useContext(CollectionContext)

    const [loading, setLoading] = useState(false)
    const [articles, setArticles] = useState()

    const [articleUrl, setArticleUrl] = useState()
    const [collectionName, setCollectionName] = useState(collection.collection_name)

    const [selectedArticle, setSelectedArticle] = useState()
    const [selectedCollection, setSelectedCollection] = useState(collection.collection_id)

    const [isShowArticleDialogue, setShowArticleDialogue] = useState(false)
    const [isShowEditArticleDialogue, setShowEditArticleDialogue] = useState(false)
    const [isShowEditCollectionDialogue, setShowEditCollectionDialogue] = useState(false)

    const sheetRef = useRef();

    const onEditCollection = async () =>{
        if(collectionName){
            const data = {collection_id:collection.collection_id,collection_name:collectionName}
            const response = await editCollection(data)
            setCollections(response);setShowEditCollectionDialogue(false)
        } else {
                ToastMessage('error', 'Failed', 'Please enter collection name')
            }
    }

    const onDeleteCollection = async () => {
        const data = {collection_id:collection.collection_id}
        const response = await deleteCollection(data)
        setCollections(response);navigation.goBack()
    }


    const onCreateArticle = async ()=> {
        try {
            setLoading(true)
            const urlInfo = await urlInfoParser(articleUrl)
            const data = {
                collection_id:selectedCollection,
                article_id:UUID(),
                article_title:urlInfo.title,
                article_url:urlInfo.url,
                favicon_url:urlInfo.favicons[0],
                read:false }
            const response = await createArticle(data)
            setCollections(response);
            const responses = await getArticles(selectedCollection)
            setArticles(responses);
            setShowArticleDialogue(false);setLoading(false)
        } catch (e) {
            ToastMessage('error', 'Invalid', 'Entered URL is invalid')
            setLoading(false)
        }
    }

    const onMarkAsRead = async () =>{
        const data = {collection_id:collection.collection_id,article_id:selectedArticle.article_id,read:true}
        const response = await markAsReadArticle(data)
        setArticles(response)
    }

    const onEditArticle = async () => {
        const data = {collection_id:collection.collection_id,selected_collection:selectedCollection,selected_article:selectedArticle}
        const response = await editArticle(data)
        setArticles(response)
        const responses = await getCollections(data)
        setCollections(responses);setShowEditArticleDialogue(false)
    }

    const onDeleteArticle = async () => {
        const data = {collection_id:collection.collection_id,article_id:selectedArticle.article_id}
        const response = await deleteArticle(data)
        setArticles(response)
        const responses = await getCollections(data)
        setCollections(responses)
    }

    const EditCollectionDialogue =()=>(
        <Dialogue heading='Edit collection' >
            <AppInput heading='Collection name' value={collectionName} onChange={setCollectionName} />
            <View style={{flexDirection:'row',marginTop:3.5}} >
                <ActionButton title='Cancel' onPress={()=>setShowEditCollectionDialogue(false)} />
                <ActionButton title='Create' color={colors.Accent} titleColor={colors.White} onPress={()=>onEditCollection()} />
            </View>
        </Dialogue>
    )

    const ArticleDialogue =()=>(
        <Dialogue heading='Create a Clip' >
            <DDPicker  heading='Collection' value={selectedCollection} setValue={setSelectedCollection} items={collections} />
            <AppInput heading='URL' onChange={setArticleUrl} />
            <View style={styles.actionButtonContainer} >
                <ActionButton title='Cancel' onPress={()=>setShowArticleDialogue(false)} />
                <ActionButton title='Create' color={colors.Accent} titleColor={colors.White} onPress={()=>onCreateArticle()} />
            </View>
        </Dialogue>
    )

    const EditArticleDialogue =() =>(
        <Dialogue heading='Create a Clip' >
            <DDPicker  heading='Collection' value={selectedCollection} setValue={setSelectedCollection} items={collections} />
            <AppInput heading='URL' onChange={setArticleUrl} value={selectedArticle.article_url} isEditable={false} />
                <View style={styles.actionButtonContainer} >
                    <ActionButton title='Cancel' onPress={()=>setShowEditArticleDialogue(false)} />
                    <ActionButton title='Save' color={colors.Accent} titleColor={colors.White} onPress={()=>onEditArticle()} />
                </View>
        </Dialogue>
    )

    const OptionBottomSheet =()=>(
        <BottomSheet ref={sheetRef} height={200} >
           <TextButton title='Open in Browser' color={colors.Accent} onPress={()=>openInBrowser(selectedArticle.article_url)} />
           <TextButton title='Mark as read' onPress={()=>onMarkAsRead()} />
           <TextButton title='Edit' onPress={()=>setShowEditArticleDialogue(true)} />
           <TextButton title='Delete' onPress={()=>onDeleteArticle()} />
        </BottomSheet>
    )

    return (
        <View style={styles.container} >
            <Loader isShow={loading} />
            <Header
                isShowIcons
                isShowBack
                right={ <View style={{flexDirection:'row'}} >
                            <TouchableOpacity  onPress={() => setShowEditCollectionDialogue(true)} >
                                <Image source={Icons.edit} style={styles.Icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>onDeleteCollection()} >
                                <Image source={Icons.delete} style={styles.Icon} />
                            </TouchableOpacity>
                        </View>
                        } />
            <FAB onPress={()=>setShowArticleDialogue(true)} />
            <SectionList
                sections={articles}
                keyExtractor={(item)=>item.article_id}
                renderSectionHeader={({section:{type}})=>(
                    <View style={styles.sectionHeaderContainer} >
                        {type === 'Read' ? <Text style={styles.sectionHeader} >{type}</Text> : null }
                    </View>
                )}
                ListEmptyComponent={()=>(<ListEmptyComponent/>)}
                renderItem={({item})=>(
                    <View>
                        <TouchableOpacity
                            onPress={()=>openInBrowser(item.article_url)}
                            onLongPress={()=>{sheetRef.current.openSheet();setSelectedArticle(item)}}
                            delayLongPress={1000}
                            style={styles.collectionNameContainer}
                        >
                        <Image source={{uri:item.favicon_url}} style={styles.favicon} />
                        <Text numberOfLines={1} style={styles.collectionName} >{item.article_title}</Text>
                        </TouchableOpacity>
                        <Divider/>
                    </View>
                )}
            />
            <OptionBottomSheet/>
            { isShowEditCollectionDialogue ? EditCollectionDialogue() : null  }
            { isShowArticleDialogue ? ArticleDialogue() : null  }
            { isShowEditArticleDialogue ? EditArticleDialogue() : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.White
    },
    Icon:{
        height:22.5,
        width:22.5,
        margin:10
    },
    sectionHeaderContainer:{
        alignItems:'center',
        justifyContent:'center',
    },
    sectionHeader:{
        fontFamily:'Italic',
        fontSize:17.5,
        opacity:0.5,
        marginVertical:20
    },
    collectionName:{
        fontFamily:'MediumItalic',
        fontSize:16.5,
        width:'90%'
    },
    collectionNameContainer:{
        width:'100%',
        paddingVertical:17.5,
        paddingHorizontal:15,
        flexDirection:'row',
        alignItems:'center'
    },
    articleNames:{
        fontFamily:'Italic',
        fontSize:12.5,
        marginTop:5,
        color:colors.Black,
    },
    bottomSheetOptionContainer:{
        width:'100%',
        justifyContent:"center",
        alignItems:"center",
        padding:15
    },
    bottomSheetOptionText:{
        fontSize:17.5,
        fontFamily:'MediumItalic'
    },
    favicon:{
        height:25,
        width:25,
        marginRight:10
    },
    actionButtonContainer:{
        flexDirection:'row',
        marginTop:3.5
    }
})

export default ViewCollection;