import Realm from 'realm';
import {BSON} from 'realm';

const DirectorySchema = {
  name: 'Directory',
  properties: {
    _id: 'objectId',
    path: 'string',
  },
};

export interface IDirectory {
  _id: BSON.ObjectId;
  path: string;
}

const realm = new Realm({schema: [DirectorySchema]});
export default realm;
