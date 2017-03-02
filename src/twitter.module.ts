import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwitterWidgetService } from './twitter-widget.service';
import { TwitterTimelineComponent } from './twitter-timeline.component';
import { TwitterTweetComponent } from './twitter-tweet.component';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ TwitterTimelineComponent, TwitterTweetComponent ],
  exports:      [ TwitterTimelineComponent, TwitterTweetComponent ]
})
export class Angular2TwitterModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Angular2TwitterModule,
      providers: [TwitterWidgetService]
    };
  }
}
