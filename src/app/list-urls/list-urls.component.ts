import { TagsService } from './../tags.service';
import { UrlsService } from './../urls.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'list-urls',
  templateUrl: './list-urls.component.html',
  styleUrls: ['./list-urls.component.css']
})
export class ListUrlsComponent implements OnInit {

  constructor(public urlsService: UrlsService, public tagsService: TagsService) { }

  ngOnInit() {
  }

  getTagsStr(tags: Array<number>): string{        
    return this.tagsService.getTagsFromArrayByIds(tags)    
  }

}
