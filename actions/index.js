import {getAllDecks} from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_NEW_DECK = 'ADD_NEW_DECK';

/**
 * Action creator function.
 * @param {} decks is an object.
 * {
 *  deck_id : {
 *      title: '...',
 *      questions : [
 *          {
 *              question : '...',
 *              answer: '...'
 *          },
 *          ...
 *      ]
 *  },
 *  ...
 * }
 */
export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

/**
 * Action creator function.
 * @param {*} deckTitle is a string.
 */
export function addNewDeck(deckTitle) {
    return {
        type: ADD_NEW_DECK,
        deckTitle
    }
}

export function handleInitialData() {
    return (dispatch) => {
        return getAllDecks().then((decks) => {
            dispatch(receiveDecks(decks));
        })
    }
}