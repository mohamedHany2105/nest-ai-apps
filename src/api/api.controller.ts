import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiService } from './api.service';
@Controller('api')
export class ApiController {
    constructor( private readonly apiService:ApiService) {
       
    }
@Post('google')
    async getGoogleData(@Body('prompt')prompt :string) {

        return this.apiService.googleChat(prompt);

    }

    @Post('openai')
    async getOpenAIData(@Body('prompt')prompt :string) {
        const response = await this.apiService.openaiChat(prompt);

        return response;
    }

}
