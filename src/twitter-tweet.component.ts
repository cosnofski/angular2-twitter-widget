import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';

import { TwitterWidgetService } from './twitter-widget.service';

@Component({
	selector: 'angular2-twitter-tweet',
	template: ``,
	styles: [ `` ],
	providers: []
})
export class TwitterTweetComponent implements OnInit, AfterViewInit
{
	@Input() tweetId: string;
	@Input() options?:any;

	constructor(private element: ElementRef, private twitterService : TwitterWidgetService){ }

	ngOnInit(){ }

	ngAfterViewInit() {
		this.options = this.options || {};
		this.twitterService.createTweet(this.tweetId, this.element, this.options).then((response:any)=>{
			//success
			console.log('createTweet::Tweet Created');
		}).catch((error:any)=>{
			//failure
			console.log('createTweet::Error');
		})
	}
}