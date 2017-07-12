import express from 'express';
let router = express.Router();
import uuid from 'uuid/v4';
import MockDraftApi from './MockDraftApi';


let mockDraftInstances = new Map();

router.post('/start',function(req,res,next){
    let mockDraftInstance = MockDraftApi.initDraft(req.params.numplayers);
    let draftuuid = uuid();
    mockDraftInstance = mockDraftInstance.map((draft)=>draft.add("UUID",draftuuid));
    mockDraftInstances.put(draftuuid,mockDraftInstance);
    res.send(mockDraftInstance);
});

router.get('/:uuid',function(req,res,next){
    res.send(mockDraftInstances.get(req.params.draftuuid).getDraftStateForTesting());
});


