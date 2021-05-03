import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  signup: any = {};
  login: any = {};
  isSignup = true;
  loginError = "";
  signupError = "";

  ngOnInit(): void {

  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  signUp() {
    this.signupError = '';
    if (this.signup.username) {
      if (this.signup.emailId) {
        if (this.validateEmail(this.signup.emailId)) {
          if (this.signup.gender) {
            if (this.signup.dob) {
              if (this.signup.phoneNumber) {
                if (this.signup.address) {
                  if (this.signup.password && this.signup.confirmPassword) {
                    if (this.signup.password == this.signup.confirmPassword) {
                      let signupData = Object.assign({}, this.signup);
                      delete signupData.confirmPassword;
                      signupData.role = "User";
                      let obj = {
                        data: signupData
                      };
                      this.apiService.signup(obj).subscribe((result) => {
                        if (result && result.status == "Success") {
                          localStorage.setItem('todo-user', JSON.stringify(result.data));
                          if (result.data.role == "Admin") {
                            this.router.navigateByUrl('/admin');
                          } else {
                            this.router.navigateByUrl('/user');
                          }
                        } else {
                          this.scrollToTop();
                          this.signupError = result.message;
                        }
                      });
                    } else {
                      this.scrollToTop();
                      this.signupError = 'Passwords does not match';
                    }
                  } else {
                    this.scrollToTop();
                    this.signupError = 'Password fields are required';
                  }
                } else {
                  this.scrollToTop();
                  this.signupError = 'Address is required';
                }
              } else {
                this.scrollToTop();
                this.signupError = 'Phone Number is required';
              }
            } else {
              this.scrollToTop();
              this.signupError = 'Date of Birth is required';
            }
          } else {
            this.scrollToTop();
            this.signupError = 'Gender is required';
          }
        } else {
          this.scrollToTop();
          this.signupError = 'Email Id format is Invalid';
        }
      } else {
        this.scrollToTop();
        this.signupError = 'Email Id is required';
      }
    } else {
      this.scrollToTop();
      this.signupError = 'Username is required';
    }
  }

  signIn() {
    this.loginError = '';
    if (this.login.emailId) {
      if (this.validateEmail(this.login.emailId)) {
        if (this.login.password) {
          let obj = {
            data: this.login
          }
          this.apiService.signin(obj).subscribe((result) => {
            if (result && result.status == "Success") {
              localStorage.setItem('todo-user', JSON.stringify(result.data));
              if (result.data.role == "Admin") {
                this.router.navigateByUrl('/admin');
              } else {
                this.router.navigateByUrl('/user');
              }
            } else {
              this.scrollToTop();
              this.loginError = result.message;
            }
          });
        } else {
          this.scrollToTop();
          this.loginError = "Password is required";
        }
      } else {
        this.scrollToTop();
        this.loginError = "Email Id format is Invalid";
      }
    } else {
      this.scrollToTop();
      this.loginError = "Email Id is required";
    }
  }

  checkNumber(e) {
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace
    var keyCode = e.which ? e.which : e.keyCode
    var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
    if (!ret) {
      e.preventDefault();
    }
    return ret;
  }

  validateEmail(emailId) {
    let mailFormat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    console.log(mailFormat.test(emailId))
    if (!mailFormat.test(emailId)) {
      return false;
    } else {
      return true;
    }
  }

}
