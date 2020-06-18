import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) { }
  forgetPasswordForm: FormGroup;
  loading = false;
  submitted = false;

  ngOnInit() {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]]
  });
  }

  get fval() { return this.forgetPasswordForm.controls; }

  onFormSubmit(){
    this.submitted = true;
    // return for here if form is invalid
    if (this.forgetPasswordForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.register(this.forgetPasswordForm.value).subscribe(
      (data)=>{
        alert('Confirmation Email sent successfully!!');
        this.router.navigate(['/login']);
     },
      (error)=>{
        this.toastr.error(error.error.message, 'Error');
        this.loading = false;
      }
    )

  }


}
