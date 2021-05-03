import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
    this.route.params.subscribe((param) => {
      if(param && param.id) {
        this.update = true;
        this.getUserById(param.id);
      } 
    });
   }

  users: any = [
    {}
  ];
  error = '';
  update = false;

  ngOnInit(): void {
  }

  addUser() {
    this.users.push({});
  }

  removeUser(i) {
    this.users = this.users.filter((val, index) => index != i);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  searchByEmail(event, object) {
    let obj = {
      data: event.target.value
    };
    this.apiService.verifyByEmail(obj).subscribe((result) => {
      if (result && result.status == "Success") {
        object.error = "";
      } else {
        object.error = result.message;
      }
    });
  }

  updateUser() {
    let newVal = this.signUp(this.users[0], 0);
    if(newVal.error == "") {
      delete newVal.error;
      let id = newVal._id;
      delete newVal._id;
      let obj = {
        id: id,
        data: newVal
      };
      this.apiService.updateUser(obj).subscribe((result) => {
        if (result && result.status == "Success") {
          this.router.navigateByUrl('/admin/home');
        } else {
          this.error = result.message;
          this.scrollToTop();
        }
      });
    }
  }

  getUserById(id) {
    let obj = {
      id: id
    };
    this.apiService.getUserById(obj).subscribe((result) => {
      if (result && result.status == "Success") {
        this.users = [
          result.data
        ];
      } else {
        this.error = result.message;
        this.scrollToTop();
      }
    });
  }

  submit() {
    this.error = "";
    let valid = this.users.filter((val, index) => {
      let newVal = this.signUp(val, index);
      if (newVal.error == '') {
        return val;
      }
    })
    if (valid.length == this.users.length) {
      let data = Object.assign([], this.users);
      let obj = {
        data: data.map((val) => { delete val.error; return val; })
      };
      this.apiService.addUsers(obj).subscribe((result) => {
        if (result && result.status == "Success") {
          this.router.navigateByUrl('/admin/home');
        } else {
          this.error = result.message;
          this.scrollToTop();
        }
      });
    }
  }

  scrollToDiv(div) {
    window.scrollTo({
      top: document.getElementById(div).getBoundingClientRect().top,
      behavior: 'smooth',
    });
  }

  signUp(obj, i) {
    this.scrollToDiv('userId-' + i)
    obj.error = '';
    if (obj.username) {
    if (obj.emailId) {
      if (this.validateEmail(obj.emailId)) {
        if (obj.gender) {
          if (obj.dob) {
            if (obj.phoneNumber) {
              if (obj.address) {
                obj.role = "User";
              } else {
                this.scrollToDiv('userId-' + i)
                obj.error = 'Address is required';
              }
            } else {
              this.scrollToDiv('userId-' + i)
              obj.error = 'Phone Number is required';
            }
          } else {
            this.scrollToDiv('userId-' + i)
            obj.error = 'Date of Birth is required';
          }
        } else {
          this.scrollToDiv('userId-' + i)
          obj.error = 'Gender is required';
        }
      } else {
        this.scrollToDiv('userId-' + i)
        obj.error = 'Email Id format is Invalid';
      }
    } else {
      this.scrollToDiv('userId-' + i)
      obj.error = 'Email Id is required';
    }
  } else {
    this.scrollToDiv('userId-' + i)
    obj.error = 'Username is required';
  }
    return obj;
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
