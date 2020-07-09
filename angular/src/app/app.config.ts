import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
    public readonly API_ENDPOINT: string = 'http://dailyreport-env.eba-ujj35ppr.us-east-2.elasticbeanstalk.com:8080/api';
    public readonly API_MOCK_ENDPOINT: string = 'https://next.json-generator.com/api/json/get';
}
