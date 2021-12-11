import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-model';
import {MessageService} from 'primeng/api';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
  providers: [MessageService]
})
export class EmployeeDashboardComponent implements OnInit {
  hideAdd:boolean=false;
  hideUpdate:boolean=true;
  formvalue !:FormGroup;
  employeeData:any;
  EmployeemodelObj:EmployeeModel = new EmployeeModel()
  userForm:any;
  
  constructor(private formbuild:FormBuilder , private _api:ApiService,private messageService: MessageService) { }

  showSuccess() {
    
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
}

  ngOnInit(): void {
    this.buildForm();
    this.addUser();
    this.formvalue=this.formbuild.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      salary:[''],
 
    
  })

    this.getEmployeeData();

  }
  showAdd()
  {
    this.hideAdd=false;
  }

  postEmployeeDetails()
  {
    this.EmployeemodelObj.firstName = this.formvalue.value.firstName;
    this.EmployeemodelObj.lastName = this.formvalue.value.lastName;
    this.EmployeemodelObj.email = this.formvalue.value.email;
    this.EmployeemodelObj.mobile = this.formvalue.value.mobile;
    this.EmployeemodelObj.salary = this.formvalue.value.salary;

    this._api.postEmployee(this.EmployeemodelObj).subscribe(res=>{
      
      this.showSuccess();
      this.formvalue.reset();
    },err=>
    {
      alert("somthing went wrong");
    })
  }

  getEmployeeData()
  {
    this._api.getEmployee().subscribe(res=>{
       this.employeeData=res;
       
    })
  }
  deleteEmployeeData(empdata:any)
  {
 
    this._api.deleteEmployee(empdata.id).subscribe(res=>
      {
        alert("employee get deleted");
      })
  }

  editEmployeeData(row:any)
  {
    this.hideAdd = true; 
    this.hideUpdate=false;
    this.EmployeemodelObj.id=row.id;
    this.formvalue.controls['firstName'].setValue(row.firstName);
    this.formvalue.controls['lastName'].setValue(row.lastName);
    this.formvalue.controls['email'].setValue(row.email);
    this.formvalue.controls['mobile'].setValue(row.mobile);
    this.formvalue.controls['salary'].setValue(row.salary);
  }
  UpdateEmployeeDetails()
  {
   
  this.EmployeemodelObj.firstName = this.formvalue.value.firstName;
  this.EmployeemodelObj.lastName = this.formvalue.value.lastName;
  this.EmployeemodelObj.email = this.formvalue.value.email;
  this.EmployeemodelObj.mobile = this.formvalue.value.mobile;
  this.EmployeemodelObj.salary = this.formvalue.value.salary;
  
  this._api.updateEmployee(this.EmployeemodelObj.id,this.EmployeemodelObj).subscribe(res=>{
     alert("data updated successfully")
    })
  }
  buildForm() {
    this.userForm = new FormGroup({
      users: new FormArray([])
    })
  }

  addUser() {
    const add = this.userForm.get('users') as FormArray;
    add.push(new FormControl(''));
  }

  removeUser(i:any) {
    const remove = this.userForm.get('users') as FormArray;
    remove.removeAt(i);
  }
}
