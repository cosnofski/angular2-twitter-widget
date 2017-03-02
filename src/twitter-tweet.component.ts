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

	constructor(private element: ElementRef, private twitterService : TwitterWidgetService){ }

	ngOnInit(){ }

	ngAfterViewInit() {
		//MAKE SURE TWITTER WIDGET SCRIPT IS LOADED IN HEAD...
		this.twitterService.LoadScript().subscribe (twttr => {
			//SUCCESS, WE HAVE TWITTER WIDGETS JS FILE LOADED...
			let nativeElement = this.element.nativeElement;

			(<any>window)['twttr'].widgets.createTweet(this.tweetId, nativeElement, {}).then(function success(embed:any) {
					//console.log('Created tweet widget: ', embed);
			}).catch(function creationError(message:any) {
					//console.log('Could not create widget: ', message);
			});				
		}, err => { 
			//ERROR
			console.log('****  ERROR LOADING TWITTER WIDGET', err);
		}, () => {
			//COMPLETE
		});
	}

	private onTwitterLoaded(twttr:any){
		console.log('TWITTER LOADED YO', twttr);
	};
}