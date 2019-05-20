import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { AddUrlComponent } from './add-url/add-url.component';
import { ListUrlsComponent } from './list-urls/list-urls.component';
import { ListTagsComponent } from './list-tags/list-tags.component';


@NgModule({
  declarations: [
    AppComponent,
    AddUrlComponent,
    ListUrlsComponent,
    ListTagsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
