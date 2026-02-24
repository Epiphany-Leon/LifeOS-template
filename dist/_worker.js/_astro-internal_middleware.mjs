globalThis.process ??= {}; globalThis.process.env ??= {};
import './chunks/astro-designed-error-pages_2A6o4pfv.mjs';
import './chunks/astro/server_29JV-YUN.mjs';
import { s as sequence } from './chunks/index_B_cbUwUp.mjs';

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	
	
);

export { onRequest };
