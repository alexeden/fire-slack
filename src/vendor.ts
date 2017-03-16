import '@angular/common';
import '@angular/compiler';
import '@angular/core';
import '@angular/forms';
import '@angular/http';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/router';
import 'ramda';
import 'rxjs';
import 'snabbdom-jsx';

/* Store jQuery & Tether on the window before importing Bootstrap */
import * as jQuery from 'jquery';
import * as Tether from 'tether';
window['jQuery'] = jQuery;
window['Tether'] = Tether;
import 'bootstrap';
