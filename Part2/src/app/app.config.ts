/**
 * Author: Student Name
 * Assignment: PROG2005 Assessment 2 - Part 2
 * Description: Application configuration
 */

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
