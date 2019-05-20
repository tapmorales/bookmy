import { ITags } from './tags.service';
import { Injectable } from '@angular/core';

export interface ITags{
  id: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  tags: Array<ITags> = [
    {id: 1, name: 'html'},
    {id: 2, name: 'css'},
    {id: 3, name: 'javascript'},
    {id: 4, name: 'node'},
    {id: 5, name: 'frontend'}
  ]

  constructor() { }

  private generateId(tag: string): number{
    const idTags = this.tags.map(tag => tag.id )
    return Math.max(...idTags) + 1
  }

  addTag(tag: string): number{
    const strTags = this.tags.map(tag => tag.name)    
    const newId = this.generateId(tag)

    if(strTags.indexOf(tag) === -1){
      this.tags.push({
        id: newId,
        name: tag
      })
      return newId
    } else {
      return strTags.indexOf(tag) + 1
    }    
  }

  public getIdByTag(tag: string): number{
    return this.tags.filter( _tag => _tag.name === tag )[0].id
  }

  public getTagById(id: number): string{
    return this.tags.filter( _tag => _tag.id === id )[0].name
  }

  public getIdsFromArrayByTags(tags: Array<string>): Array<number>{
    const arrIds = []
    tags.forEach( _tag => {
      arrIds.push(this.addTag(_tag))
    })
    return arrIds
  }

  public getTagsFromArrayByIds(ids: Array<number>): string{
    const arrStr = ids.map( (id, i) => {
      const filtred = this.tags.filter( t => {
        return t.id === id
      } )[0].name
      return filtred
    } )
    return arrStr.join(', ')
  }
}
