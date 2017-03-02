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
	@Input() options?:any;

	constructor(private element: ElementRef, private twitterService : TwitterWidgetService){ }

	ngOnInit(){ }

	ngAfterViewInit() {
		this.options = this.options || {};
		let nativeElement = this.element.nativeElement;
		this.twitterService.createTimeline(this.screenName, nativeElement, this.options).then((response:any)=>{
			//success
		}).catch((error:any)=>{
			//error
		})
	}

	private onTwitterLoaded(twttr:any){
		console.log('TWITTER LOADED YO', twttr);
	};
}