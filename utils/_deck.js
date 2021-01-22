export const DECK_STORAGE_KEY = 'MobileFlashCards:Decks';

/**
 * Formating the result receive from AsyncStorage.
 * @param {} decks 
 */
export function formatDeckResult(decks) {
    if (decks == null)
        return {};
    return JSON.parse(decks);
}

/**
 * Initialize a deck object from title.
 * @param {} title 
 */
export function initialDeck(title) {
    return {
        title : title,
        questions: []
    }
}