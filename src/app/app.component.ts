import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'angular-websocket';
  messageFromServer: string;
  wsSubscription: Subscription;
  status;


  constructor(private websocketService: WebsocketService) {
    this.wsSubscription =
      this.websocketService.createObservableSocket()
        .subscribe(
          data => this.messageFromServer = data,
          err => console.log('err'),
          () => console.log('The observable stream is complete')
        );
  }

  sendMessageToServer(){
    const msg:{action: string, data: any}={action: 'sendMessage', 'data': 'Hello from UI'};
    this.status = this.websocketService.sendMessage(JSON.stringify(msg));
   }

  closeSocket(){
    this.wsSubscription.unsubscribe();
     this.status = 'The socket is closed';
  }

  ngOnDestroy() {
    this.closeSocket();
  }

}
