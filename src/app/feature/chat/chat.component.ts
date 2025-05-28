import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeminiGoogleAiService } from '@core';

@Component({
  selector: 'app-chat',
  imports: [NgClass, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  messages = signal<{ text: string; isUser: boolean }[]>([]);
  userInput = signal('');
  isLoading = signal(false);

  #genAiService = inject(GeminiGoogleAiService);

  async onSubmit() {
    if (!this.userInput().trim()) return;

    this.isLoading.set(true);

    // Append user message to the chat log
    this.addMessage(this.userInput(), true);

    const userMessage = this.userInput();
    this.userInput.set('');

    try {
      const response = await this.#genAiService.askGemini(userMessage);
      // Append AI response to the chat log
      this.addMessage(response, false);
    } catch (error) {
      this.addMessage('Error: Could not reach the Gemini API', false);
      console.error('Error:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  private addMessage(text: string, isUser: boolean): void {
    this.messages.update((prev) => [...prev, { text, isUser }]);
  }
}
