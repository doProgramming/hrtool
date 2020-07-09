import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/bs-datepicker.config';
import { DailyReportV2Service } from '../../_services/daily-report-v2.service';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.scss']
})
export class DailyReportComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dailyReportService: DailyReportV2Service,
    private toastr: ToastrService
  ) { 
    this.bsConfig = { containerClass: 'theme-blue' };
    this.currentUser = localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')) : '';
  }
  dailyReportForm: FormGroup;
  loading = false;
  submitted = false;
  public currentUser;
  bsConfig : Partial<BsDatepickerConfig>

  ngOnInit() {
    this.dailyReportForm = this.formBuilder.group({
      yesterday: ['', Validators.required],
      today: ['', Validators.required],
      tomorrow: ['', Validators.required],
      day: ['', Validators.required],
      needs: [''],
      issues :[''],
      miscellaneous: [''],
      consultant: ['']
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
    let dailyReport = this.dailyReportForm.value;
    dailyReport.consultant = this.currentUser.firstName + "."+ this.currentUser.lastName;

    this.dailyReportService.dailyReportSave(dailyReport).subscribe((res)=>{
      if(res){

        this.toastr.success('Daily Report Saved successfully.', 'Success', { timeOut: 1000 });
        this.dailyReportForm.reset();
        this.loading = false;
      }
      
     },
      (error)=>{
        this.toastr.error(error.message, 'Error');
        this.loading = false;
      }
    )

  }
}
