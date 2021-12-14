import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { JokeModel } from 'src/app/models/jokeModel.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  joke!: JokeModel;
  isLoggedIn: boolean = false;
  displayedJoke?: JokeModel;

  constructor(
    private api: ApiServiceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  onGetJoke() {
    this.api.getJoke().subscribe((data: JokeModel) => {
      this.displayedJoke = data;
    });
  }

  onSaveJoke(joke: JokeModel) {
    this.api.saveJoke(joke);
    alert('Joke added to favorites list!')
  }
}
