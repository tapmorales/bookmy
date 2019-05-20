import { Component, OnInit, Input } from '@angular/core';
import { UrlsService } from '../../services/urls.service/urls.service'

@Component({
  selector: 'add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.css']
})
export class AddUrlComponent implements OnInit {

  url: string = ''
  tags: string = ''

  constructor(public urlsService: UrlsService) { }  
  
  ngOnInit() {
  }

  addUrl(){
    this.urlsService.addUrl(this.url, this.tags)
    this.url=''
    this.tags = ''
  }

}
