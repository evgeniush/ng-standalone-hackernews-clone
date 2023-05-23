import { InjectionToken, ValueProvider } from '@angular/core';
import { AppConfigModel } from '@hn-models';

export const APP_CONFIG = new InjectionToken<AppConfigModel>(
  'hacker-news.config'
);

export const getAppConfigProvider = (value: AppConfigModel): ValueProvider => ({
  provide: APP_CONFIG,
  useValue: value,
});
