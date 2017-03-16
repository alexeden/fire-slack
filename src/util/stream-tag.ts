import { Observer } from 'rxjs';

const errorCss = `background-color: #ee0000; color: #ffffff; font-weight: bold; padding: 5px;`;
const completeCss = `background-color: #007700; color: #ffffff; font-weight: bold; padding: 5px;`;

const next = (tag: string) => (v: any) => console.log(`${tag} next: `, v);
const error = (tag: string) => (v: any) => console.log(`%c${tag} error: `, errorCss, v);
const complete = (tag: string) => () => console.log(`%c${tag} completed`, completeCss);

export const streamTag: (tag: string) => Observer<any>
  = (tag: string) => ({
      next: next(tag),
      error: error(tag),
      complete: complete(tag)
    });

export const streamErrorTag
  = (tag: string) => ({
      error: error(tag)
    });

export const streamCompleteTag
  = (tag: string) => ({
      complete: complete(tag)
    });
