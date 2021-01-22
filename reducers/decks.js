import { RECEIVE_DECKS, ADD_NEW_DECK, REMOVE_A_DECK, ADD_NEW_QUESTION, REMOVE_A_QUESTION } from '../actions';

export default function decks(decks = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...decks,
                ...action.decks
            }
        case ADD_NEW_DECK:
            {
                const deck = action.deck;
                return {
                    ...decks,
                    [deck.title]: deck
                }
            }
        case REMOVE_A_DECK:
            {
                const title = action.deckTitle;
                const result = { ...decks }
                delete result[title]
                return result
            }
        case ADD_NEW_QUESTION:
            {
                const title = action.deckTitle;
                const question = action.question;
                return {
                    ...decks,
                    [title]: {
                        ...decks[title],
                        questions: [...decks[title].questions, question]
                    }
                }
            }
        case REMOVE_A_QUESTION:
            {
                const title = action.deckTitle;
                const question = action.question;
                return {
                    ...decks,
                    [title] : {
                        ...decks[title],
                        questions: decks[title].questions.filter(q => q.question !== question.question)
                    }
                }
            }
        default:
            return decks;
    }
}