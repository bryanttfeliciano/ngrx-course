import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { noop } from "rxjs";
import { tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { login } from "../auth.actions";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.form = fb.group({
      email: ["test@angular-university.io", [Validators.required]],
      password: ["test", [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    const value = this.form.value;
    this.auth
      .login(value.email, value.password)
      .pipe(
        tap((user) => {
          console.log(user);
          const loginAction = this.store.dispatch(login({ user }));
          this.router.navigateByUrl("/courses");
        })
      )
      .subscribe(noop, () => alert("Login Failed"));
  }
}
