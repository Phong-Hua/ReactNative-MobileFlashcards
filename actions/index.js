import {getAllDecks, saveDeck, deleteADeck} from '../utils/api';
import {initialDeck} from '../utils/_deck';
import {initQuestion} from '../utils/_question';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_NEW_DECK = 'ADD_NEW_DECK';
export const REMOVE_A_DECK = 'REMOVE_A_DECK';
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';
export const REMOVE_A_QUESTION = 'REMOVE_A_QUESTION';

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
function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

/**
 * Action creator function.
 * @param {*} deckTitle is a string.
 */
function addNewDeck(deck) {
    return {
        type: ADD_NEW_DECK,
        deck
    }
}

function removeADeck(deckTitle) {
    return {
        type: REMOVE_A_DECK,
        deckTitle
    }
}

function addNewQuestion(deckTitle, question) {
    return {
        type: ADD_NEW_QUESTION,
        deckTitle,
        question
    }
}


function removeAQuestion(deckTitle, question) {
    return {
        type: REMOVE_A_QUESTION,
        deckTitle,
        question
    }
}

export function handleInitialData() {
    return (dispatch) => {
        return getAllDecks().then((decks) => {
            dispatch(receiveDecks(decks));
        })
    }
}

export function handleAddNewDeck(deckTitle) {
    return (dispatch) => {
        const deck = initialDeck(deckTitle);
        dispatch(addNewDeck(deck));
        return saveDeck(deckTitle, deck).catch((error) => {
            console.warn('An error happened when add this deck: ', error)
            dispatch(removeADeck(deckTitle))
        })
    }    
}

export function handleDeleteADeck(deckTitle)  {
    return (dispatch, getState) => {
        const removedDeck = getState().decks[deckTitle];
        dispatch(removeADeck(deckTitle));
        deleteADeck(deckTitle)
        .catch((error) => {
            console.warn('An error happened when delete this deck: ', error);
            dispatch(addNewDeck(removedDeck))
        })
    }
}

export function handleAddNewQuestion(deckTitle, content, answer) {
    return (dispatch, getState) => {
        const question = initQuestion(content, answer);
        dispatch(addNewQuestion(deckTitle, question))
        const afterDeck = getState().decks[deckTitle];
        return saveDeck(deckTitle, afterDeck).catch((error) => {
            console.warn('An error happened when add this question: ', error)
            dispatch(removeAQuestion(afterDeck.title, question))
        })
    }
}