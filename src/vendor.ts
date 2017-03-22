/* Polyfills */
import 'reflect-metadata';
import 'core-js/es6';
import 'core-js/es7';
import 'zone.js/dist/zone';
import 'whatwg-fetch';

/* Framework */
import '@angular/common';
import '@angular/core';
import '@angular/forms';
import '@angular/http';
import '@angular/platform-browser-dynamic';

/* Libraries */
import 'rxjs';
import 'ramda';
import 'uuid';

/* Store jQuery & Tether on the window before importing Bootstrap */
import * as jQuery from 'jquery';
import * as Tether from 'tether';
window['jQuery'] = jQuery;
window['Tether'] = Tether;
import 'bootstrap';
