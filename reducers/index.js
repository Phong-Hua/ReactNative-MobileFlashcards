import { RECEIVE_DECKS, ADD_NEW_DECK } from '../actions';

export default function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_NEW_DECK:
            const title = action.deckTitle;
            return {
                ...state,
                [title]: {
                    title,
                    questions: []
                }
            }
        default:
            return state;
    }
}