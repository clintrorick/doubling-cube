import CardData from '../card-data/carddata';
import uuid from 'uuid/v4';

// I'm using some patterns here that I've discovered to be anti-patterns within ES6 -
// (specifically using -this- as a sort of class member variable enabler.)
// Will refactor once I get my sea legs.

export default class MockDraftApi {

    constructor(){
        this.CardPool= [];
        this.UnopenedPacks = [];
        this.OpenedPacks =[];
        this.Players = [];
        this.PlayerIsDraftingPackMap = new Map();
        this.PlayerHasQueuedPacksMap = new Map();
        this.PlayerHasDraftedCardsMap = new Map();
        this.initDraft = this.initDraft.bind(this);
        this.getDraftStateForTesting = this.getDraftStateForTesting.bind(this);
        this.playerMakesPick = this.playerMakesPick.bind(this);
    }

    initDraft(numPlayers){
        this._initCardPool();
        this._initPlayers(numPlayers);
        this._initPacks(numPlayers);
        this._assignInitialPacksToPlayers();
        this._initPlayerHasDraftedCards();
        this._initPlayerHasQueuedPacks();
        return this;
    }

    playerMakesPick(playerUUID,draftedCard,updatedPack){

       //  if(this._isPlayerCheating(playerUUID,draftedCard,updatedPack)){
       //     console.log("cheater!");
       //     throw {exceptionMsg:"Cheater!"};
       // }
        // update PlayerHasDraftedCards
        this.PlayerHasDraftedCardsMap.get(playerUUID).push(draftedCard);
        // remove pack from PlayerIsDraftingPack
        this.PlayerIsDraftingPackMap.set(playerUUID,null);
        // update PackRfrn[] by id with updatedPack

        //     add new pack (with updated cards) to PlayerHasQueuedPacks[] for next player in order

        let currPlayerOrdinal = this.Players.find((playerObj)=> playerObj.UUID === playerUUID).ordinal;
        let playerToPassTo = this.Players.find((playerObj)=> playerObj.ordinal === currPlayerOrdinal + 1);
        this.PlayerHasQueuedPacksMap.get(playerToPassTo.UUID).push(updatedPack);


    }

    _isPlayerCheating(playerMakingPick, pickedCard, updatedPack){
        //TODO- implement player client secrets to avoid malicious player imitations - UUID has to be publicly known
        let clientPackMatchesServerPack = this.PlayerIsDraftingPackMap.get(playerMakingPick.UUID).UUID === updatedPack.UUID;
        let pickedCardIsFromCurrentPack = updatedPack.some(card => pickedCard.cardUUID === card.cardUUID);

        return !(clientPackMatchesServerPack && pickedCardIsFromCurrentPack);

        //TODO: zero sum check - picked card + updated pack = PackRfrn
    }

    _initPlayerHasDraftedCards(){
        for (const player of this.Players){
            this.PlayerHasDraftedCardsMap.set(player.UUID,[]);
        }
    }

    _initPlayerHasQueuedPacks(){
        for (const player of this.Players){
            this.PlayerHasQueuedPacksMap.set(player.UUID,[]);
        }
    }

    _initPacks(numPlayers){
        for (let i=0;i<numPlayers;i++){
            const pack = this._initPack();
            this.UnopenedPacks.push(pack);
        }
    }

    _initPack(){
        const pack = new Pack();
        pack.cards = [];
        for(var i=0; i < 15; i++) {
            var randomCard = this.CardPool[~~(Math.random() * this.CardPool.length)];
            pack.cards.push(randomCard);
            //commented out so card pool can be smaller for testing
           // this._removeCardFromCardPool(randomCard);
        }
        return pack;
    }

    _initPlayers(numPlayers){
        for(let i=1; i <= numPlayers; i++) {
            const newplayer = new Player("Player_"+i, i);
            this.Players.push(newplayer);
        }
    }

    _assignInitialPacksToPlayers(){
        for (let player of this.Players){
            var randomPack = this.UnopenedPacks[~~(Math.random() * this.UnopenedPacks.length)];
            this.PlayerIsDraftingPackMap.set(player.UUID, randomPack);
            this._openPack(randomPack);
        }
    }

    _openPack(openedPack){
        //remove pack from unopened packs
        this.UnopenedPacks.map((pack,index)=>{
            if (pack.UUID === openedPack.UUID){
                this.UnopenedPacks.splice(index,1);
            }
        });

        this.OpenedPacks.push(openedPack);
    }

    _removeCardFromCardPool(assignedCard){
        this.CardPool.map((card,index)=>{
            if (card.name === assignedCard.name){
                this.CardPool.splice(index,1);
            }
        });
    }

    _initCardPool(){
        this.CardPool = Object.values(CardData).map((card)=>
            new Card(card)
        );
    }

    getDraftStateForTesting(){
        return this;
    }


}

export class Player{
    constructor(playerName,ordinal){
        Object.assign(this,{playerName,ordinal});
        this.UUID = uuid();
    }
}

export class Pack{
    constructor(cards){
        Object.assign(this,cards);
        this.UUID = uuid();
        this.getUUID = this.getUUID.bind(this);
    }

    getUUID(){
        return this.UUID;
    }
}

export class Card{
    constructor(cardObj){
        //could juse use Object.assign, but this makes the schema explicit
        this.layout = cardObj.layout;
        this.name = cardObj.name;
        this.manaCost = cardObj.manaCost;
        this.cmc = cardObj.cmc;
        this.colors = cardObj.colors;
        this.cardType = cardObj.type;
        this.cardTypes = cardObj.cardTypes;
        this.subTypes = cardObj.subTypes;
        this.text = cardObj.text;
        this.power = cardObj.power;
        this.toughness = cardObj.toughness;
        this.imageName = cardObj.imageName;
        this.colorIdentity = cardObj.colorIdentity;
        this.UUID = uuid();
    }

    defaultCard(){
        return this({
            "layout": "normal",
            "name": "Air Elemental",
            "manaCost": "{3}{U}{U}",
            "cmc": 5,
            "colors": [
                "Blue"
            ],
            "type": "Creature — Elemental",
            "types": [
                "Creature"
            ],
            "subtypes": [
                "Elemental"
            ],
            "text": "Flying",
            "power": "4",
            "toughness": "4",
            "imageName": "air elemental",
            "colorIdentity": [
                "U"
            ]
        });
    }
}







