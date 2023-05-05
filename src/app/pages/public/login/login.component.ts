import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NativeMessagesService } from 'src/app/services/nativeMessages/nativeMessages.service';
import { SensorsService } from 'src/app/services/sensors/sensors.service';
import { UsersService } from 'src/app/services/users/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showNewClient: boolean = false;
  showRecuperarPasse: boolean = false;
  env = environment;
  push_token: any;
  constructor(
    private authService: AuthService,
    private nativeMessagesService: NativeMessagesService,
    private router: Router,
    private userService: UsersService,
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.authService.isLogged()) {
      this.router.navigate([`admin`, `sensors`, `list`]);
      return;
    }
  }

  async onSubmitLogin(form: NgForm) {
    if (form.valid) {
      await this.nativeMessagesService.loading();
      const data = form.value;
      const response = await this.authService.login(data.username, data.password);

      this.nativeMessagesService.closeLoading();

      if (response.message == "success") {
        this.userService.pushNotificationRegister();

        this.authService.setUser(response.data);

        this.router.navigate([`admin`, `sensors`, `list`]);

        this.nativeMessagesService.closeLoading();
        form.reset();
        return;
      }
      this.nativeMessagesService.error(response.message);
      return;
    }
    this.nativeMessagesService.error("Preencha todos os campos corretamente");
  }
}