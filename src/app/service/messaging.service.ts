import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class MessagingService {
    token;
    currentMessage = new BehaviorSubject(null);

    constructor() {

    }

    receiveMessage(): void {

    }

    topic(topic): void {
        // this.fun.httpsCallable('subscribeToTopic')({ topic, token: this.token })
    }
}
