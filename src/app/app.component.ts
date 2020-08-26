import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'
// import { Observable, Subject} from 'rxjs'
// import { map, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators'

/* Old imports */
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/SwitchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    results$: Observable<any>;
    searchString: string;
    
    title = 'rxjsplay';
    constructor(private http: HttpClient) { }
    searchSubject$ = new Subject<string>();
    // observable$;
    ngOnInit() {
    /*------------------------------------------
    this.observable$ = Observable.create((observer) => {
          observer.next(1);
          observer.next(2);
          observer.next(3);
          observer.complete();
      });
      this.observable$.subscribe(
          value => console.log(value),
          err => {},
          () => console.log('End!!')
      );
    ------------------------------------------*/

    this.results$ = this.searchSubject$
                    .debounceTime(200)
                    .distinctUntilChanged()
                    .do(x => console.log('do: ', x))
                    .switchMap(searchString => this.queryAPI(searchString));


    }

    queryAPI(searchString) {
        console.log('queryAPI: ', searchString);
        return this.http.get(`https://www.reddit.com/r/aww/search.json?q=${searchString}`)
                        .map(result => result['data']['children']);
    }

    inputChanged($event) {
        console.log('input changed', $event);
        this.searchSubject$.next($event);
    }

    ngOnDestroy() {
        //   this.observable$.unsubscribe();
    }
}
