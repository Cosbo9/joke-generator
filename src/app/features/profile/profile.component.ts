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
  refreshed?: boolean = false;
  favoriteJokes?: JokeModel[] = [];
  User: any;

  constructor(
    private authService: AuthService,
    private apiService: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.authService.loggedInUser().subscribe((data) => {
      this.User = data;
    });
    this.onRefresh();
  }

  onRefresh() {
    this.apiService.getFavoriteJokes().subscribe((data) => {
      if (!this.refreshed) {
        Object.values(data).map((joke) => {
          this.favoriteJokes?.push(joke);
        });
        this.refreshed = !this.refreshed
      }
    });
  }
}
