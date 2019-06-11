//eslink 

//import { TagsService } from '../../services/tags.service/tags.service';
import { UrlsService, IUrl } from '../../services/urls.service/urls.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'list-urls',
  templateUrl: './list-urls.component.html',
  styleUrls: ['./list-urls.component.css']
})
export class ListUrlsComponent implements OnInit {

  urls: IUrl[] = []

  constructor(public urlsService: UrlsService) { }

  ngOnInit() {
    this.getUrls()
  }

  getUrls(){
    this.urlsService.getUrls()
      .subscribe( _urls => {
        console.log(_urls)
        this.urls = _urls
      } )
  }

  del(url: IUrl, e: Event){
    e.preventDefault()
    console.log(url)
    if(confirm('Deseja realmente deletar a url: \n' + url.url  ))
      this.urlsService.del(url).subscribe( data => console.log )
  }

  public editing = null
  public urlEditing = null

  public update(i: number, url: IUrl, e: Event){
    e.preventDefault()
    console.log(i)
    console.log(url)
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
    this.urlsService.update(this.urlEditing).subscribe( () => this.cancelEdit() )
  }

  getTagsStr(tags: Array<number>){        
    //return this.tagsService.getTagsFromArrayByIds(tags)    
  }

}
