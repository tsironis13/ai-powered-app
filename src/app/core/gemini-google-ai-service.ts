import { Injectable } from '@angular/core';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class GeminiGoogleAiService {
  #genAi: GoogleGenerativeAI;

  constructor() {
    this.#genAi = new GoogleGenerativeAI(environment.googleAiKey);
  }

  /**
   * Communicate with Gemini - Google AI using text prompt
   */
  async askGemini(prompt: string): Promise<string> {
    const model: GenerativeModel = this.#genAi.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });
    const content = await model.generateContent(prompt);
    return content.response.text();
  }
}
