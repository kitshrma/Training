import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { DataService } from '../data.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';

describe('home component tests', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async() => {

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule,HttpClientModule],
      declarations: [ HomeComponent ],
      providers: [DataService]
    }).compileComponents();
  
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    
  });

  it('is home component defined', () => {
    expect(component).toBeDefined();

 });

 it('is form in-valid when empty', () => {
    expect(component.messageForm.valid).toBeFalsy();

});

it('is form valid when correct inputs are provided', () => {
  let name = component.messageForm.controls['name'];
  name.setValue("training");
  let startDate = component.messageForm.controls['startDate'];
  startDate.setValue(new Date("2019-01-16"));
  let endDate = component.messageForm.controls['endDate'];
  endDate.setValue(new Date("2019-01-17"));
  
  expect(component.messageForm.controls['name'].valid).toBeTruthy();
  expect(component.messageForm.controls['startDate'].valid).toBeTruthy();
  expect(component.messageForm.controls['endDate'].valid).toBeTruthy();
  expect(component.messageForm.valid).toBeTruthy();
  
});

it('is form in-valid when end date is less than start date', () => {
  let name = component.messageForm.controls['name'];
  name.setValue("training");
  let startDate = component.messageForm.controls['startDate'];
  startDate.setValue(new Date("2019-01-16"));
  let endDate = component.messageForm.controls['endDate'];
  endDate.setValue(new Date("2019-01-15"));
  
  expect(component.messageForm.controls['name'].valid).toBeTruthy();
  expect(component.messageForm.controls['startDate'].valid).toBeTruthy();
  expect(component.messageForm.controls['endDate'].valid).toBeFalsy();
  expect(component.messageForm.valid).toBeFalsy();
  
});
  

})
