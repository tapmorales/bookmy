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

  getTagsStr(tags: Array<number>){        
    //return this.tagsService.getTagsFromArrayByIds(tags)    
  }

}
