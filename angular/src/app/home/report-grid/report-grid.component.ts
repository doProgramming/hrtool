import { Component, OnInit } from '@angular/core';
import { DailyReportV2Service } from '../../_services/daily-report-v2.service';
import { ToastrService } from 'ngx-toastr';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';

@Component({
  selector: 'app-report-grid',
  templateUrl: './report-grid.component.html',
  styleUrls: ['./report-grid.component.scss']
})
export class ReportGridComponent implements OnInit {

  
  primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  dailyReports: any[]=[];
  loading: boolean = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;


  constructor(private dailyReportService: DailyReportV2Service,private toastr: ToastrService) { }

  ngOnInit() {
    this.initGrid()
  }

  initGrid(){
    this.getDailyReportData();
  }

  getDailyReportData = () =>{
    this.loading = true;
    this.dailyReports = [];
    this.dailyReportService.getAllDailyReports().subscribe(res=>{
      if(res){
        this.dailyReports = Object.assign(res);
        console.log(this.dailyReports);
      }else{
        this.dailyReports = [];
      }
      this.loading = false;
     },
      (error)=>{
        this.toastr.error(error.message, 'Error');
        this.loading = false;
      });
  }


}
