import { Component, OnInit } from '@angular/core';
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
  delJokeKeys: string[] = [];
  User: any;

  constructor(
    private authService: AuthService,
    private apiService: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.authService.loggedInUser().subscribe((data) => {
      this.User = data;

      this.apiService.getFavoriteJokes().subscribe((data) => {
        Object.keys(data).map((keys) => {
          this.delJokeKeys?.push(keys);
        });
        Object.values(data).map((joke) => {
          this.favoriteJokes?.push(joke);
        });
      });
    });
  }

  onDelete(delIndex: number) {
    const delKey = this.delJokeKeys[delIndex];
    this.apiService.deleteJoke(delKey).subscribe(() => {
      this.apiService.getFavoriteJokes().subscribe(() => {
        console.log("fetch jokes fired")
      });
    });
  }
}
