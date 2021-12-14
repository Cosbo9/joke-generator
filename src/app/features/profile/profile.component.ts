import { Component, OnInit } from '@angular/core';
import { JokeModel } from 'src/app/models/jokeModel.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  favoriteJokes?: JokeModel[] = [];
  User: any;

  constructor(
    private authService: AuthService,
    private apiService: ApiServiceService
  ) {
    this.authService.loggedInUser().subscribe((data) => {
      this.User = data;
    });
  }

  ngOnInit(): void {
    this.apiService.getFavoriteJokes().subscribe((data) => {
      Object.values(data).map((joke) => {
        this.favoriteJokes?.push(joke);
      });
    });
  }
}
