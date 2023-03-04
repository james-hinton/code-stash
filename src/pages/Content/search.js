import {
  searchStackOverflowCode,
  isStackOverflowPage,
} from './sites/stackoverflow.js';
import { searchBasicCode } from './sites/basic.js';

export function searchCode() {
  if (isStackOverflowPage()) {
    searchStackOverflowCode();
  } else {
    searchBasicCode();
  }
}
