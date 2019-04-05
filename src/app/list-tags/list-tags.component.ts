import { UrlsService } from './../urls.service';
import { TagsService, ITags } from './../tags.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.css']
})
export class ListTagsComponent implements OnInit {

  tags: Array<ITags>
  tagFiltred = null

  constructor(public tagsService: TagsService, public urlsService: UrlsService) { 
    this.tags = tagsService.tags;
    
  }  

  ngOnInit() {
  }

  filterTag(){
    this.urlsService.filterByIdTag(parseInt(this.tagFiltred))
  }
  clearFilter(){
    this.tagFiltred = null
    this.urlsService.clearFilter()
  }

}
