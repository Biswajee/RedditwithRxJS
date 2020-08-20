import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Subject } from 'rxjs'
import { map, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators'
// import 'rxjs/add/operator/do'
// import 'rxjs/add/observable/fromEvent'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private http: HttpClient){}
    searchSubject$ = new Subject<string>()
    results$: Observable<any>;
    searchString;


    title = 'rxjsplay';
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
    .pipe(debounceTime(200))
    .pipe(distinctUntilChanged())
    .pipe(tap(x => console.log('do', x)))
    .pipe(switchMap(searchString => this.queryAPI(searchString)))
  }

  queryAPI(searchString) {
      console.log('queryAPI', searchString);
      return this.http.get(`https://www.reddit.com/r/aww/search.json?q=${searchString}`)
    //   .pipe(map(result => result['data']['children']))
      .pipe(tap(result => console.log(result)))
  }


  ngOnDestroy() {
    //   this.observable$.unsubscribe();
  }
}
