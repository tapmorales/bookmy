import { IUrl } from './urls.service';
import { Injectable } from '@angular/core';
import { TagsService } from '../tags.service/tags.service';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';



export interface IUrl {
  readonly _id?: string;
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

  public getUrls(): Observable<IUrl[]>{
    return this.http.get<IUrl[]>(this.pathUrl)
  }

  public addUrl(url: string, tags: string){
    console.log('post', {url, tags})
    return this.http.post(this.pathUrl, {url, tags})
    
  }

  public filterByIdTag(_tags: string){
    return this.http.get(this.pathUrl + '/' + _tags)
  }

  public clearFilter(){
    return this.getUrls()
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
