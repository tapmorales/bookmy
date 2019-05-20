import { Injectable } from '@angular/core';
import { TagsService } from '../tags.service/tags.service';

export interface IUrl{
  id: number,
  url: string,
  tags: Array<number>
}

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  urlsOriginal: Array<IUrl> = [
    {id: 1, url: 'google.com', tags: [2,3]},
    {id: 2, url: 'uol.com', tags: [1,3]},
    {id: 3, url: 'terra.com', tags: [4,5]},
    {id: 4, url: 'jquery.com', tags: [5]},
    {id: 5, url: 'udemy.com', tags: [1,2,3,4,5]}
  ]

  urls: Array<IUrl> = [...this.urlsOriginal]

  constructor(private tagsService: TagsService) { }

  public addUrl(url: string, tags: string): void{
    const strUrls = this.urlsOriginal.map(url => url.url  )
    const idUrls = this.urlsOriginal.map(url => url.id )
    const newId = Math.max(...idUrls) + 1
    const arrTags: Array<string> = tags.split(/[ ,;]+/)    

    if(strUrls.indexOf(url) === -1){
      this.urlsOriginal.push({
        id: newId,
        url,
        tags: this.tagsService.getIdsFromArrayByTags(arrTags)
      })      
    } 
    this.clearFilter()
  }

  public filterByIdTag(id: number){
    this.urls = this.urlsOriginal.filter( url => url.tags.indexOf(id) >= 0 )
  }

  public clearFilter(){
    this.urls = [...this.urlsOriginal]
  }
}
