import { Component, OnInit, Input } from '@angular/core';
import { UrlsService, IUrl } from '../../services/urls.service/urls.service'

@Component({
  selector: 'add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.css']
})
export class AddUrlComponent implements OnInit {

  url: string = ''
  tags: string = ''

  urls: IUrl[]

  constructor(public urlsService: UrlsService) { }  
  
  ngOnInit() {
    
  }  

  addUrl(){
    this.urlsService.addUrl(this.url, this.tags)
      .subscribe( data => {
        console.log(data)
      })
    this.url=''
    this.tags = ''
  }

}
