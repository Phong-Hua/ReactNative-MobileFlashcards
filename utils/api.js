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

/**
 * Delete a deck that has this title.
 * Steps:
 * 1. Get all decks from AsyncStorage.
 * 2. Remove the deck that has title from all decks.
 * 3. Save all decks to AsyncStorage.
 * @param {} title 
 */
export function deleteADeck(title) {
    return getAllDecks().then((allDeck) => {
        allDeck[title] = undefined;
        delete allDeck[title];
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(allDeck))
    })
}