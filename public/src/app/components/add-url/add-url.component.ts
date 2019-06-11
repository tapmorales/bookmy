import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  //@Output()
  //addNewUrl = new EventEmitter<IUrl>()

  constructor(public urlsService: UrlsService) { }  
  
  ngOnInit() {
    
  }  

  addUrl(){
    this.urlsService.addUrl(this.url, this.tags)
      .subscribe( data => {
        console.log('beluga')
        this.url=''
        this.tags = ''
        //this.addNewUrl.emit(data as IUrl)

      })
    
  }

}
