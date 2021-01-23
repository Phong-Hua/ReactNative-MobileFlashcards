import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { handleInitialData } from '../actions';
import { gray, blue, white } from '../utils/color';
import { borderWidth, borderRadius, titleBigSize, titleMediumSize } from '../utils/style';

class DeckList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        const { loadInitialData } = this.props;
        loadInitialData().then(() => {
            this.setState(() => ({
                loading: false
            }))
        });
    }

    handleClickOnDeck = (deckTitle) => {

        this.props.navigation.navigate('Deck', {
            // passing props
            deckTitle,
        })
    }

    renderDeck = ({ title, questions }) => {
        const cards = (questions === undefined || questions.length === 0) ? '0 card' : questions.length + ' cards';
        return (
            <TouchableOpacity style={styles.deck} onPress={() => this.handleClickOnDeck(title)}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.card}>{cards}</Text>
            </TouchableOpacity>
        )
    }

    decksToList = (decks) => {
        const result = Object.keys(decks).map(id => decks[id]);
        return result;
    }

    render() {
        const { decks } = this.props;
        const { loading } = this.state;

        return (
            <View style={styles.container}>
                {loading
                    ?
                    <ActivityIndicator />
                    :
                    (Object.keys(decks).length === 0)
                    ?
                    <Text style={{fontWeight: 'bold', fontSize: titleMediumSize, textAlign: 'center'}}>You don't have any deck. Start by create a new deck</Text>
                    :
                    <FlatList data={this.decksToList(decks)}
                        renderItem={(deck) => this.renderDeck(deck.item)}
                        keyExtractor={item => item.title}
                    />
                }
            </View>
        )
    }
}

function mapStateToProps({ decks }) {
    return { decks };
}

function mapDispatchToProps(dispatch) {
    return {
        loadInitialData: () => dispatch(handleInitialData()),
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',        
    },
    deck: {
        backgroundColor: white,
        borderColor: blue,
        borderRadius: borderRadius,
        borderWidth: borderWidth,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 10,
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: titleBigSize,
        textAlign: 'center'
    },
    card: {
        color: gray,
        textAlign: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);