import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Constants } from '../constants';
import { Training } from '../training';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  messageForm: FormGroup;
  errorMessage: string = Constants.ERROR_MESSAGE;
  submitted: boolean = false;
  success: boolean = false;
  dateDiff: number;

  constructor(private formBuilder: FormBuilder, private data: DataService) { }

  ngOnInit() {

    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    },{validator: this.dateLessThan('startDate', 'endDate')}
    );

    
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
        return;
    }

    // create a deep copy, since it is not nested object Object.assign works fine
    let trainingData: Training = Object.assign({}, this.messageForm.value);
    this.data.submitData(trainingData).subscribe((response : any)=>  
      {  
        console.log(response);
        this.dateDiff = response;
        // Resets form after successful submission and set submitted back to false.
        this.submitted = false;
        this.messageForm.reset();
        //display result
        this.success = true;  
        
      })  
      ,(errorResponse : any)=>  
      {  
        console.log("Error Occured " + errorResponse);  
      } 
    
    
}

dateLessThan(startDateControlName: string, endDateControlName: string) {
  return (group: FormGroup) => {
    let start = group.controls[startDateControlName];
    let end = group.controls[endDateControlName];

    if (end.errors && !end.errors.mustMatch) {
      // return if another validator has already found an error on end date
      return;
    }

    if(new Date(end.value)<new Date(start.value)){
      console.log('test start');
      end.setErrors({ mustMatch: true });
      console.log('test start');
    }
    else{
      end.setErrors(null);
    }

    
  }
}


}
