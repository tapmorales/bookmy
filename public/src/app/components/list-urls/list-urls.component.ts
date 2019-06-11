//eslink 

//import { TagsService } from '../../services/tags.service/tags.service';
import { UrlsService, IUrl } from '../../services/urls.service/urls.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'list-urls',
  templateUrl: './list-urls.component.html',
  styleUrls: ['./list-urls.component.css']
})
export class ListUrlsComponent implements OnInit, OnDestroy {

  urls: IUrl[] = []
  private unsubscribe$: Subject<any> = new Subject()

  constructor(public urlsService: UrlsService) { }

  ngOnInit() {
    this.getUrls()
  }

  getUrls(){
    this.urlsService.getUrls()
      .pipe( takeUntil(this.unsubscribe$) )
      .subscribe( _urls => this.urls = _urls)
  }

  del(url: IUrl, e: Event){
    e.preventDefault()
    if(confirm('Deseja realmente deletar a url: \n' + url.url  ))
      this.urlsService.del(url).subscribe( data => {} )
  }

  public editing = null
  public urlEditing = null

  public update(i: number, url: IUrl, e: Event){
    e.preventDefault()
    this.editing = i;
    this.urlEditing = {...url}
    this.urlEditing.tags = this.urlEditing.tags.join(', ')
  }

  public cancelEdit(){
    this.editing = null;
    this.urlEditing = null
  }

  public save(e: Event){
    console.log(e)
    console.log(this.urlEditing)
    e.preventDefault()
    this.urlEditing.tags = this.urlEditing.tags.split(/[,\s]+/)
    this.urlsService.update(this.urlEditing)
    .subscribe( () => this.cancelEdit() )
  }

  getTagsStr(tags: Array<number>){        
    //return this.tagsService.getTagsFromArrayByIds(tags)    
  }

  ngOnDestroy(){
    this.unsubscribe$.next()
  }

}
