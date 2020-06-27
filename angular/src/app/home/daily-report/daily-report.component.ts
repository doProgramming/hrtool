import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../_services';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/bs-datepicker.config';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.scss']
})
export class DailyReportComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) { 
    this.bsConfig = { containerClass: 'theme-blue' };
  }
  dailyReportForm: FormGroup;
  loading = false;
  submitted = false;
  bsConfig : Partial<BsDatepickerConfig>

  ngOnInit() {
    this.dailyReportForm = this.formBuilder.group({
      yesterdayStatus: ['', Validators.required],
      todayStatus: ['', Validators.required],
      tomorrowStatus: ['', Validators.required],
      date: ['', Validators.required],
      issues: ['']
  });
  }

  get fval() { return this.dailyReportForm.controls; }

  onFormSubmit(){
    this.submitted = true;
    // return for here if form is invalid
    if (this.dailyReportForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.register(this.dailyReportForm.value).subscribe(
      (data)=>{
        alert('User Registered successfully!!');
        this.router.navigate(['/login']);
     },
      (error)=>{
        this.toastr.error(error.error.message, 'Error');
        this.loading = false;
      }
    )

  }
}
