import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JokeModel } from '../models/jokeModel.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  user: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.loggedInUser().subscribe((user) => {
      this.user = user?.uid;
    });
  }

  getJoke() {
    return this.http.get<JokeModel>('https://icanhazdadjoke.com/', {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    });
  }

  saveJoke(joke: JokeModel) {
    console.log('in api service ' + joke.id)
    this.http
      .post<JokeModel>(
        `https://dad-jokester-default-rtdb.firebaseio.com/${this.user}.json`,
        joke
      )
      .subscribe(data => {
        console.log(data)
      });
  }

  getFavoriteJokes() {
    return this.http.get<JokeModel[]>(
      `https://dad-jokester-default-rtdb.firebaseio.com/${this.user}.json`
    );
  }

  deleteJoke(delJoke: string) {
    console.log(delJoke)
    return this.http.delete<string>(
      `https://dad-jokester-default-rtdb.firebaseio.com/${this.user}/${delJoke}.json`
    )
  }
}
