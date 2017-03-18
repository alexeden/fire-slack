import { curry } from 'ramda';
import { Observer } from 'rxjs';

export const tag = curry((txt, x) => console.log(`${txt}: `, x) || x);

const errorCss = `background-color: #ee0000; color: #ffffff; font-weight: bold; padding: 5px;`;
const completeCss = `background-color: #007700; color: #ffffff; font-weight: bold; padding: 5px;`;

const next = (tagText: string) => (v: any) => console.log(`${tagText} next: `, v);
const error = (tagText: string) => (v: any) => console.log(`%c${tagText} error: `, errorCss, v);
const complete = (tagText: string) => () => console.log(`%c${tagText} completed`, completeCss);

export const tag$: (tagText: string) => Observer<any>
  = (tagText: string) => ({
      next: next(tagText),
      error: error(tagText),
      complete: complete(tagText)
    });

export const tagError$
  = (tagText: string) => ({
      error: error(tagText)
    });

export const tagComplete$
  = (tagText: string) => ({
      complete: complete(tagText)
    });
