import MockDraftApi from './MockDraftApi';
import {expect} from 'chai';

describe('MockDraftApi', function() {
    it('should init players, cardpool, openedpacks, unopenedpacks', function(){
        const draftState = new MockDraftApi().initDraft(8);
        expect(draftState.Players.length).to.equal(8);
        expect(draftState.CardPool.length).to.equal(46);
        expect(draftState.OpenedPacks.length).to.equal(8);
        expect(draftState.UnopenedPacks.length).to.equal(0);

        for (let pack of draftState.OpenedPacks){
            pack.cards.map((card)=>{
                expect(card.UUID).to.be.a('string');
                expect(card.name).to.be.a('string');
            })
        }
    });

    it('should advance draft state correctly after player makes pick',function(){

        const draftSize = 8;
        const statefulMockDraftApi = new MockDraftApi();
        const draftState = statefulMockDraftApi.initDraft(draftSize);
        const player1 = draftState.Players[0];
        const pack = draftState.PlayerIsDraftingPackMap.get(player1.UUID);

        fakePlayerMakesPick(statefulMockDraftApi.playerMakesPick,player1,pack);

        const updatedDraftState = statefulMockDraftApi.getDraftStateForTesting();

        assertThat_Player1_IsNoLongerDraftingPack(updatedDraftState,player1);

        assertThat_Player2_HasPassedPackInQueue(updatedDraftState,player1,pack);

        assertThat_Player1_HasCardInPool(updatedDraftState,player1,draftSize);


    });

    function assertThat_Player1_HasCardInPool(updatedDraftState,player1,draftSize){
        expect(updatedDraftState.PlayerHasDraftedCardsMap.size).to.equal(draftSize);
        expect(updatedDraftState.PlayerHasDraftedCardsMap.get(player1.UUID)).to.have.length(1);
        expect(updatedDraftState.PlayerHasDraftedCardsMap.get(player1.UUID)[0].manaCost).to.be.a('string');
    }

    function assertThat_Player1_IsNoLongerDraftingPack(updatedDraftState,player1){
        expect(updatedDraftState.PlayerIsDraftingPackMap.size)
            .to.equal(8);
        expect(updatedDraftState.PlayerIsDraftingPackMap.get(player1.UUID))
            .to.be.a('null');
    }

    function fakePlayerMakesPick(playerMakesPick,playerToMakePick,pack){
        const draftedCard = pack.cards[0];
        pack.cards.splice(0,1);

        playerMakesPick(playerToMakePick.UUID, draftedCard, pack);
    }

    function assertThat_Player2_HasPassedPackInQueue(updatedDraftState,player1,pack){
        let player2 = updatedDraftState.Players.find(
            (playerObj)=> playerObj.ordinal === (player1.ordinal+1));

        expect(updatedDraftState.PlayerHasQueuedPacksMap.get(player1.UUID))
            .to.have.lengthOf(0);
        expect(updatedDraftState.PlayerHasQueuedPacksMap.get(player2.UUID)[0].UUID)
            .to.equal(pack.UUID);
    }
});

