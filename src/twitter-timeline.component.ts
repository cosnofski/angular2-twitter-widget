import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';

import { TwitterWidgetService } from './twitter-widget.service';

@Component({
	selector: 'angular2-twitter-timeline',
	template: ``,
	styles: [ `` ],
	providers: []
})
export class TwitterTimelineComponent implements OnInit, AfterViewInit
{
	@Input() screenName: string;

	constructor(private element: ElementRef, private twitterService : TwitterWidgetService){ }

	ngOnInit(){ }

	ngAfterViewInit() {
		this.twitterService.createTimeline(this.screenName, this.element, {}).then((response:any)=>{
			//success
		}).catch((error:any)=>{
			//error
		})
	}

	private onTwitterLoaded(twttr:any){
		console.log('TWITTER LOADED YO', twttr);
	};
}