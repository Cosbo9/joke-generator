import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { JokeModel } from 'src/app/models/jokeModel.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  favoriteJokes?: JokeModel[] = [];
  delJokeKey?: string[] = [];
  User: any;

  constructor(
    private authService: AuthService,
    private apiService: ApiServiceService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    this.authService.loggedInUser().subscribe((data) => {
      this.User = data;

      this.apiService.getFavoriteJokes().subscribe((data) => {
        Object.keys(data).map(keys => {
          this.delJokeKey?.push(keys)
        })
        Object.values(data).map((joke) => {
          this.favoriteJokes?.push(joke);
        });
      });
    });
  }

  onDelete(data: any) {
    console.log('index of deleted item ' + data)
    //  slicing out the index is the direction i need to go
    //  the first index still catches the whole list
    //  after selecting only that key try to pass it to the delete function
    console.log(this.delJokeKey?.slice(data))
  }
}
