import { AfterContentInit, Component } from '@angular/core';
import { LocalStorageObServable } from './observable/local-storage-observable';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ToastRepository } from './repository/toast-repository';
import { UserRepository } from './repository/user-repository';
import { Subscription } from 'rxjs';
import { MessagingService } from './service/messaging.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements AfterContentInit {
  private routerEventsListener: Subscription;
  excludes: string[] = ['/reset', '/order/new', '/order/cancel', '/TV'];
  message;
  title: any;
  constructor(
    public localStorageService: LocalStorageObServable,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public userRepository: UserRepository,
    public toastRepository: ToastRepository,
    private messagingService: MessagingService,
    private modalService: BsModalService
  ) {
    this.routerEventsListener = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        toastRepository.showLoading(true);
      }
      if (event instanceof NavigationEnd) {
        toastRepository.showLoading();
      }
    })
    this.modalService.config.ignoreBackdropClick = true; // 设置全局的禁止backdrop点击关闭 modal
  }


  ngOnDestroy(): void {
    this.routerEventsListener.unsubscribe();
  }

  ngAfterContentInit(): void {
    this.router.navigate(['/supplier']);
    this.localStorageService.getItem('UserInfo').subscribe((val) => {
      let currentUrl = window.location.href;
      currentUrl = currentUrl.split('/#')[1];
      if (!val) {
        // this.userRepository.getAccessToken().subscribe((user) => {
        //   if (user.statusCode === 200) {
        //     this.localStorageService.setItem("accessToken", user.data.accessToken);
        //   }
        // });
        if (this.excludes.find(e => currentUrl.indexOf(e) != -1)) {
          return;
        }
        // this.router.navigate(['/login']);
      } else {
        // this.router.navigate(["/Web/Location"]);
        if (currentUrl && currentUrl !== '/') {
          return;
        }
        // this.router.navigate(['/Home']);
      }
    });
  }

}



