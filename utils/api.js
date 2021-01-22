import AsyncStorage from '@react-native-community/async-storage';
import {DECK_STORAGE_KEY, formatDeckResult} from './_deck';

/**
 * Save a deck to AsyncStorage.
 * @param {*} title 
 * @param {*} deck 
 */
export function saveDeck(title, deck) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title] : deck
    }))
}

/**
 * Get all decks from Async Storage
 */
export function getAllDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(formatDeckResult)
}

// export function deleteDeck(title)