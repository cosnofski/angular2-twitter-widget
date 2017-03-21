import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { ICollectionDataSource, IListDataSource, IProfileDataSource, IUrlDataSource, IWidgetDataSource } from './timeline-datasource'
import { TwitterWidgetService } from './twitter-widget.service';

@Component({
	selector: 'angular2-twitter-timeline',
	template: ``,
	styles: [ `` ],
	providers: []
})
export class TwitterTimelineComponent implements AfterViewInit
{
	@Input() dataSource: ICollectionDataSource | IListDataSource | IProfileDataSource | IUrlDataSource | IWidgetDataSource;
	@Input() options?:any;

	constructor(private element: ElementRef, private twitterService : TwitterWidgetService){ 
		console.log('TwitterTimelineComponent: constructor()')
	}

	ngAfterViewInit() {
		this.options = this.options || {};
		let nativeElement = this.element.nativeElement;
		this.twitterService.createTimeline(this.dataSource, nativeElement, this.options).then((response:any)=>{
			//success
			console.log(`WidgetResponse: ${response}`)
		}).catch((error:any)=>{
			//error
		})
	}

	private onTwitterLoaded(twttr:any){
		console.log('TWITTER LOADED YO', twttr);
	};
}