import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@hn-core';
import { Story } from '@hn-models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  readonly #appConfig = inject(APP_CONFIG);
  readonly #http = inject(HttpClient);

  getNewStories(): Observable<Array<number>> {
    return this.#http.get<Array<number>>(
      `${this.#appConfig.baseURL}/newstories.json?print=pretty`
    );
  }

  getItem(id: number): Observable<Story> {
    return this.#http.get<Story>(
      `${this.#appConfig.baseURL}/item/${id}.json?print=pretty`
    );
  }
}
