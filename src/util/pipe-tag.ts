import { curry } from 'ramda';

export const pipeTag = curry((txt, x) => console.log(`${txt}: `, x) || x);
