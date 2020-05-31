import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FavoriteChangedEventArgs } from '../favorite/favorite.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts = {
    isActive: true,
    isFavorite: true,
  }

  constructor() { }

  ngOnInit(): void {
  }

  onFavoriteChanged(eventArgs: FavoriteChangedEventArgs) {
    console.log(eventArgs);
  }

}
