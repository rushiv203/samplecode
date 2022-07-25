import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import Validation from '@app/utils/validation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fName: ['', [Validators.required]],
      lName: ['', [Validators.required]],
      email: ['', [Validators.required ]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
    },{
      validators: [Validation.match('password', 'repassword')]
    });
  }

  onSubmit(): void {
    let data = this.registerForm.value;
    console.log(this.registerForm.invalid,
      this.isValidEmail(data.email),
      this.registerForm.invalid && (this.isValidEmail(data.email) === true));
    
    if (this.isValidEmail(data.email)) {
      Swal.fire({
        title: 'Success!',
        text: 'form  submitted successfully',
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      
    }else {
      Swal.fire({
        title: 'Error!',
        text: 'Please Enter Valid Email',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

   
  }
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
 
  private isValidEmail(emailString: string): boolean {
   
    try {
      let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"); 
      let valid = pattern.test(emailString);
      return valid;
    } catch (TypeError) {
      return false;
    }
  }



  
}
