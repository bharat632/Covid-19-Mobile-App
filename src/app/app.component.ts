import { Component , OnInit} from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'covid19-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private emailComposer : EmailComposer ) {
  }

  ngOnInit(){
  }

  //email composer to government
  sendEmail(){
    this.emailComposer.open({
      app:'gmail',
      to:'ncov2019@gov.in'
    })
  }



}
