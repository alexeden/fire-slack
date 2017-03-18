import './polyfills';
import '@angular/common';
import '@angular/core';
import '@angular/forms';
import '@angular/http';
import '@angular/platform-browser-dynamic';
import 'ramda';
import 'rxjs';
import 'snabbdom-jsx';
import 'uuid';

/* Store jQuery & Tether on the window before importing Bootstrap */
import * as jQuery from 'jquery';
import * as Tether from 'tether';
window['jQuery'] = jQuery;
window['Tether'] = Tether;
import 'bootstrap';
