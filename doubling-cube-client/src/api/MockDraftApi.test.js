///
// Abandoned - use MockDraftApi.spec.js instead (written with mocha/chai)
//
//
//
// import MockDraftApi from './MockDraftApi';
// import {Player,Pack,Card} from './MockDraftApi';
//
// test('draft inits properly', ()=>{
//     const draftState = new MockDraftApi().initDraft(8);
//     expect(draftState.Players.length).toBe(8);
//     expect(draftState.CardPool.length).toBe(46);
//     expect(draftState.OpenedPacks.length).toBe(8);
//     expect(draftState.UnopenedPacks.length).toBe(0);
//
//     for (let pack of draftState.OpenedPacks){
//         pack.cards.map((card)=>{
//             expect(card.UUID).toEqual(expect.anything());
//             expect(card.name).toEqual(expect.anything());
//         })
//     }
// });
//
// test('When pick is made, packs are moved to next drafter',()=>{
//     const statefulMockDraftApi = new MockDraftApi();
//     const draftState = statefulMockDraftApi.initDraft(8);
//
//     const player = draftState.Players[0];
//     const playerUUID = player.UUID;
//     const pack = draftState.PlayerIsDraftingPackMap.get(playerUUID);
//     const draftedCard = pack.cards[0];
//
//     pack.cards.splice(0,1);
//     statefulMockDraftApi.playerMakesPick(playerUUID, draftedCard, pack);
//     const draftStateAfterPickMade = statefulMockDraftApi.getDraftStateForTesting();
//
//     expect(draftStateAfterPickMade.PlayerIsDraftingPackMap.size).toBe(8);
//     expect(draftStateAfterPickMade.PlayerIsDraftingPackMap.get(playerUUID)).toBeNull();
//
//     let playerToPassTo = draftStateAfterPickMade.Players.find((playerObj)=> playerObj.ordinal === (player.ordinal+1));
//
//     expect(draftStateAfterPickMade.PlayerHasQueuedPacksMap.get(playerUUID)).toHaveLength(0);
//     expect(draftStateAfterPickMade.PlayerHasQueuedPacksMap.get(playerToPassTo.UUID)[0].UUID).toBe(pack.UUID);
//
//
// });
//
// // this.CardPool= this._initCardPool(CardData);
// // this.UnopenedPacks = [];
// // this.OpenedPacks =[];
// // this.Players = [];
// // this.PlayerIsDraftingPackMap = new Map();
// // this.PlayerHasQueuedPacksMap = new Map();
// // this.PlayerHasDraftedCardsMap = new Map();