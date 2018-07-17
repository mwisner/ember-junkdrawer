import {assert} from '@ember/debug';
import {typeOf} from '@ember/utils';

export default function isEmptyObject(testObject) {
  if (typeOf(testObject) === 'instance') {
    return false;
  }
  if (typeOf(testObject) === 'object') {
    return Object.keys(testObject).length === 0;
  }
  return false;
}
