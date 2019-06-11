import { IUrl } from './urls.service';
import { Injectable } from '@angular/core';
import { TagsService } from '../tags.service/tags.service';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import {Observable, throwError, BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';



export interface IUrl {
  readonly _id?: string;
  readonly timestamp?: string;
  url: string;
  title: string;
  description: string;
  private: boolean;
  tags: Array<string>
}

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  // urlsOriginal: Array<IUrl> = [
  //   {id: 1, url: 'google.com', tags: [2,3]},
  //   {id: 2, url: 'uol.com', tags: [1,3]},
  //   {id: 3, url: 'terra.com', tags: [4,5]},
  //   {id: 4, url: 'jquery.com', tags: [5]},
  //   {id: 5, url: 'udemy.com', tags: [1,2,3,4,5]}
  // ]

  // urls: Array<IUrl> = [...this.urlsOriginal]

  constructor(private tagsService: TagsService, private http: HttpClient) { }

  pathUrl = 'http://localhost:3000/api/urls'

  private urlsSubject$ = new BehaviorSubject<IUrl[]>(null)
  private loaded = false

  public getUrls(): Observable<IUrl[]>{
    // return this.http.get<IUrl[]>(this.pathUrl)
    if(!this.loaded){
      this.http.get<IUrl[]>(this.pathUrl)
        .pipe( tap(urls => console.log), )
        .subscribe(this.urlsSubject$)
        this.loaded = true
    } 
    return this.urlsSubject$.asObservable()
  }

  public addUrl(url: string, _tags: string){
    console.log('post', {url, _tags})
    const tags = _tags.split(/[,\s]+/)
    return this.http.post(this.pathUrl, {url, tags})
      .pipe(
        tap( (url: IUrl) => {
          console.log(this.urlsSubject$.getValue())
          console.log(url)
          this.urlsSubject$.getValue().splice(0, 0, {
            description: url.description+'',
            private: url.private,
            tags,
            timestamp: url.timestamp,
            title: url.title,
            url: url.url,
            _id: url._id
          
          }) 
        })
      )      
  }

  public filterByIdTag(_tags: string){
    return this.http.get(this.pathUrl + '/' + _tags)
  }

  public clearFilter(){
    return this.getUrls()
  }

  public del(url: IUrl): Observable<any>{
    console.log('service del')
    console.log(url)
    if(url && url._id)
      return this.http.delete(this.pathUrl + '/' + url._id)
                .pipe( tap( () => {
                  let index = this.urlsSubject$.getValue().findIndex( u => u._id === url._id)
                  if(index >= 0){
                    this.urlsSubject$.getValue().splice(index, 1)
                  }
                  
                } ))
  }

  public update(url: IUrl): Observable<IUrl>{
    return this.http.put<IUrl>(this.pathUrl + '/' + url._id, url)
              .pipe( tap( (_url)  => {
                console.log(_url) //na resposta do server não vem o _id
                console.log(url)
                let index = this.urlsSubject$.getValue().findIndex( u => u._id === url._id)
                  if(index >= 0){
                    this.urlsSubject$.getValue()[index] = url
                  }
              } ) )

  }

  // public addUrl(url: string, tags: string): void{
  //   const strUrls = this.urlsOriginal.map(url => url.url  )
  //   const idUrls = this.urlsOriginal.map(url => url.id )
  //   const newId = Math.max(...idUrls) + 1
  //   const arrTags: Array<string> = tags.split(/[ ,;]+/)    

  //   if(strUrls.indexOf(url) === -1){
  //     this.urlsOriginal.push({
  //       id: newId,
  //       url,
  //       tags: this.tagsService.getIdsFromArrayByTags(arrTags)
  //     })      
  //   } 
  //   this.clearFilter()
  // }

  // public filterByIdTag(id: number){
  //   this.urls = this.urlsOriginal.filter( url => url.tags.indexOf(id) >= 0 )
  // }

  // public clearFilter(){
  //   this.urls = [...this.urlsOriginal]
  // }
}
