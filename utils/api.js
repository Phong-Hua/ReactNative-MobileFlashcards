import AsyncStorage from '@react-native-community/async-storage';

const DECK_STORAGE_KEY = 'MobileFlashCards:Decks';

export function saveDeck(deckTitle) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [deckTitle] : {
            title : deckTitle
        }
    })).then((result) => {
        console.log('Result', JSON.stringify(result))
    })
}

/**
 * Get all decks from Async Storage
 */
export function getAllDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
}