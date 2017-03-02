import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TwitterWidgetService {
    readonly TWITTER_SCRIPT_ID = 'twitter-wjs';
	readonly TWITTER_WIDGET_URL = 'https://platform.twitter.com/widgets.js';

	constructor(){ }		

    LoadScript() : Observable<any> {
        let that = this;

		return Observable.create((observer:any) => {
            //START LOADING SCRIPT INTO DOM
            that.startScriptLoad();

            //WHEN TWITTER WIDGETS SCRIPT IS LOADED, THEN PASS ALONG....
            (<any>window)['twttr'].ready(function onLoadTwitterScript(twttr:any){
                observer.next(twttr);
                observer.complete();
            }); 
        });
    };

    private startScriptLoad() {
        (<any>window)['twttr'] = (function(d, s, id, url){
            var js, 
                fjs = d.getElementsByTagName(s)[0],
                t = (<any>window)['twttr'] || {};

            if (d.getElementById(id)) return t;

            js = d.createElement(s);
            js.id = id;
            js.setAttribute('src', url);
            //js.src = url;
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];
            
            t.ready = function(f:any) {
                t._e.push(f);
            };

            return t;
        }(document, "script", this.TWITTER_SCRIPT_ID, this.TWITTER_WIDGET_URL));
    }

    createTweet(tweetId:any, element:any){
        //(<any>window)['twttr'].widgets.createTweet(this.tweetId, nativeElement, {}).then
        return new Promise((resolve, reject) => {
            this.LoadScript().subscribe(twttr => {
                let nativeElement = element.nativeElement;
                let options = [];

                (<any>window)['twttr'].widgets.createTweet(tweetId, nativeElement, {}).then( (embed:any) => {
                    console.log('Created tweet widget: ', embed);
                    resolve(true);
                }).catch((error:any)=>{
                    console.log('Could not create tweet widget: ', error);
                    resolve(false);
                })
            })
        })
    }

    createTimeline(screenName:any, element:any, options:any) {
        return new Promise((resolve, reject) => {
            this.LoadScript().subscribe(twttr => {
                let nativeElement = element.nativeElement;
                //let options = [];
                
                if(typeof screenName == 'string' && screenName.length > 0){
                    options['screenName'] = screenName;
                }

                let dataSource:any = {
                    sourceType : 'profile',
                    screenName : screenName
                };
                

                (<any>window)['twttr'].widgets.createTimeline(dataSource, nativeElement, options).then( (embed:any) => {
                    console.log('Created timeline widget: ', embed);
                    resolve(true);
                }).catch((error:any)=>{
                    console.log('Could not create widget: ', error);
                    resolve(false);
                })
            })
        })
    }

    createTimelineNew(timelineArgs:any, element:any, options:any) {
        return new Promise((resolve, reject) => {
            this.LoadScript().subscribe(twttr => {
                let nativeElement = element.nativeElement;
                //let options = [];

                (<any>window)['twttr'].widgets.createTimeline(timelineArgs, element, options).then( (embed:any) => {
                    console.log('Created timeline widget: ', embed);
                    resolve(true);
                }).catch((error:any)=>{
                    console.log('Could not create widget: ', error);
                    resolve(false);
                })
            })
        })
    }  
}

//export interface Window { [key: string]: any }
