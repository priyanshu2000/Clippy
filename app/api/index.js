import ToastMessage from '../components/ToastMessage'
import AsyncStorage from '@react-native-community/async-storage';

export const getCollections = async () => {
    try {
        const results = await AsyncStorage.getItem('@clippy')
        return results != null ? JSON.parse(results) : [];
    } catch (e) {
        ToastMessage('error', 'Something went wrong', 'Please try again.')
    }
}

export const createCollection = async ( data ) => {
    try {
        const results = await AsyncStorage.getItem('@clippy')
        const collections = results != null ? JSON.parse(results) : [];
        const updatedCollections = [
            data,
            ... collections
        ]
        const updatedData = JSON.stringify(updatedCollections)
        await AsyncStorage.setItem('@clippy', updatedData)
        ToastMessage('success', 'Created', 'Collection created successfully.')
        return getCollections()
    } catch (e) {
        ToastMessage('error', 'Failed', 'Collection not created.')
    }ToastMessage('error', 'Something went wrong', 'Please try again.')
}

export const editCollection = async ( data ) => {
    const { collection_id, collection_name } = data;
    try {
        const results = await AsyncStorage.getItem('@clippy')
        const collections = results != null ? JSON.parse(results) : [];
        const updatedCollections = collections.map((collection) => collection.collection_id === collection_id ? {
            ...collection,
            collection_name: collection_name
        } : collection)
        const updatedData = JSON.stringify(updatedCollections)
        await AsyncStorage.setItem('@clippy', updatedData)
        ToastMessage('success', 'Edited', 'Collection edited successfully.')
        return getCollections()
    } catch (e) {
        ToastMessage('error', 'Failed', 'Collection not edited.')
    }
}

export const deleteCollection = async ( data ) => {
    const { collection_id } = data
    try {
        const results = await AsyncStorage.getItem('@clippy')
        const collections = results != null ? JSON.parse(results) : [];
        const updatedCollections = collections.filter((collection) => collection.collection_id != collection_id) || []
        const updatedData = JSON.stringify(updatedCollections)
        await AsyncStorage.setItem('@clippy', updatedData)
        ToastMessage('success', 'Deleted', 'Collection deleted successfully.')
        return getCollections()
    } catch (e) {
        ToastMessage('error', 'Failed', 'Collection not deleted.')
    }
}

export const getArticles = async ( collection_id ) => {
    try {
        const results = await AsyncStorage.getItem('@clippy')
        const collections = results != null ? JSON.parse(results) : [];
        const articles = collections.filter((collection) =>
                             collection.collection_id === collection_id)[0].data
        const sortedArticleObjects = {}
        articles.forEach((article) => {
            const read = article.read
            if (sortedArticleObjects[read]) {
                sortedArticleObjects[read].push(article);
            } else {
                sortedArticleObjects[read] = [article];
            }
        })
        const sortedArticles = Object.keys(sortedArticleObjects).map((read) => {
            return {type: read, data: sortedArticleObjects[read]}
        })
        return sortedArticles[0].type === false ? sortedArticles : sortedArticles.reverse()
    } catch (e) {

    }
}

export const createArticle = async ( data ) => {
    const { collection_id,article_id,article_title,article_url,favicon_url,read } = data;
    try {
        const results = await AsyncStorage.getItem('@clippy')
        const collections = results != null ? JSON.parse(results) : [];
        const updatedCollections = collections.map((collection) => collection.collection_id === collection_id ? {
            ...collection,
            data: [
                ...collection.data, {
                    article_id,
                    article_title,
                    article_url,
                    favicon_url,
                    read
                }
            ]
        } : collection)
        const updatedData = JSON.stringify(updatedCollections)
        await AsyncStorage.setItem('@clippy', updatedData)
        ToastMessage('success', 'Created', 'Clip created successfully.')
        return getCollections()
    } catch (e) {
        ToastMessage('error', 'Failed', 'Clip not created.')
    }
}

export const markAsReadArticle = async ( data ) => {
    const { collection_id, article_id } = data;
    try {
        const results = await AsyncStorage.getItem('@clippy')
        const collections = results != null ? JSON.parse(results) : [];
        const updatedCollections = collections.map((collection) => collection.collection_id === collection_id ? {
            ...collection,
            data: collection.data.map((article) => article.article_id === article_id ? {
                ...article,
                read: 'Read'
            } : article)
        } : collection)
        const updatedData = JSON.stringify(updatedCollections)
        await AsyncStorage.setItem('@clippy', updatedData)
        ToastMessage('success', 'Marked', 'Clip Marked as read successfully.')
        return getCollections()
    } catch (e) {
        ToastMessage('error', 'Failed', 'Clip not Marked as read.')
    }
}

export const editArticle = async ( data ) => {
    const { collection_id,selected_collection,selected_article } = data;
    try {
        const results = await AsyncStorage.getItem('@clippy')
        const collections = results != null ? JSON.parse(results) : [];
        const updatedCollections = collections.map((collection) => collection.collection_id === collection_id ? {
            ...collection,
            data: collection.data.filter((article) => article.article_id != selected_article.article_id)
        } : collection)
        const updatedCollection = updatedCollections.map((collection) => collection.collection_id === selected_collection ? {
            ...collection,
            data: [...collection.data, selected_article]
        } : collection)
        const updatedData = JSON.stringify(updatedCollection)
        await AsyncStorage.setItem('@clippy', updatedData)
        ToastMessage('success', 'Edited', 'Clip edited successfully.')
        return getCollections()
    } catch (e) {
        ToastMessage('error', 'Failed', 'Clip not edited.')
    }
}

export const deleteArticle = async ( data ) => {
    const { collection_id, article_id } = data;
    try {
        const results = await AsyncStorage.getItem('@clippy')
        const collections = results != null ? JSON.parse(results) : [];
        const updatedClips = collections.map((collection) => collection.collection_id === collection_id ? {
            ...collection,
            data: collection.data.filter((article) => article.article_id != article_id) || []
        } : collection)
        const updatedData = JSON.stringify(updatedClips)
        await AsyncStorage.setItem('@clippy', updatedData)
        ToastMessage('success', 'Deleted', 'Clip Deleted successfully.')
        return getCollections()
    } catch (e) {
        ToastMessage('error', 'Failed', 'Clip not deleted.')
    }
}

