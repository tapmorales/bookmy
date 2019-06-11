import { HttpClient } from '@angular/common/http';
import { ITags } from './tags.service';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

export interface ITags{
  qtd?: number;
  urls: string[];
  tag: string;
}

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private pathUrl = 'http://localhost:3000/api/tags'
  tagsSubject$: BehaviorSubject<ITags[]> = new BehaviorSubject<ITags[]>(null)
  private loaded = false
  
  constructor(private http: HttpClient) { }

  // private generateId(tag: string): number{
  //   const idTags = this.tags.map(tag => tag.id )
  //   return Math.max(...idTags) + 1
  // }

  getTags(): Observable<ITags[]> {
    console.log('getTags chamado')
    if(!this.loaded){
      this.http.get<ITags[]>(this.pathUrl)
        .subscribe(this.tagsSubject$)
        this.loaded = true
    }
    return this.tagsSubject$.asObservable()
    //return this.http.get<ITags[]>(this.pathUrl)
     
  }

  addTag(tag: string){
    // const strTags = this.tags.map(tag => tag.name)    
    // const newId = this.generateId(tag)

    // if(strTags.indexOf(tag) === -1){
    //   this.tags.push({
    //     id: newId,
    //     name: tag
    //   })
    //   return newId
    // } else {
    //   return strTags.indexOf(tag) + 1
    // }    
  }

  public getIdByTag(tag: string){
    
  }

  public getTagById(id: number){
    
  }

  // public getIdsFromArrayByTags(tags: Array<string>): Array<number>{
  //   const arrIds = []
  //   tags.forEach( _tag => {
  //     arrIds.push(this.addTag(_tag))
  //   })
  //   return arrIds
  // }

  // public getTagsFromArrayByIds(ids: Array<number>): string{
  //   const arrStr = ids.map( (id, i) => {
  //     const filtred = this.tags.filter( t => {
  //       return t.id === id
  //     } )[0].name
  //     return filtred
  //   } )
  //   return arrStr.join(', ')
  // }
}
