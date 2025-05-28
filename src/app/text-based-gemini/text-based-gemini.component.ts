import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { GeminiGoogleAiService } from '@core';

@Component({
  selector: 'app-text-based-gemini',
  imports: [],
  templateUrl: './text-based-gemini.component.html',
  styleUrl: './text-based-gemini.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextBasedGeminiComponent implements OnInit {
  response = signal('');

  #genAiService = inject(GeminiGoogleAiService);

  ngOnInit(): void {
    this.askGemini('What is the capital of Greece?');
  }

  /**
   * Communication with Gemini using Service
   * @param text - Text to be sent to Gemini
   */
  private askGemini(text: string) {
    this.#genAiService.askGemini(text).then(
      (result: string) => {
        this.response.set(result);
      },
      (error: Error) => {
        alert(error);
      }
    );
  }
}
