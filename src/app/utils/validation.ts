import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
  static searchCondition(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['searchCondition']) {
        return null;
      }
      if (control?.errors && !control.errors['searchCondition']) {
        return null;
      }
      if (
        ( control?.value  == '' && checkControl?.value != '' ) ||
        ( control?.value  != '' && checkControl?.value == '' )
      ){
        controls.get(controlName)?.setErrors({ searchCondition: true });
        console.log('condition having error');
        return { searchCondition: true };
      } else {
        return null;
      }
    };
  }

  static lessThanToday(controlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);

      if (control?.value == "") {
        return null;
       }

       if (control?.value != "") {
        // console.log(formControl.value)
        let now = Date.now();   
        let fdate = new Date(control?.value)
        let currentdate = new Date(now);
        // console.log(currentdate)
        // console.log(fdate)
        if (fdate > currentdate) {
          controls.get(controlName)?.setErrors({ lessThanToday: true });
          // console.log("Invalid Date")
          return { lessThanToday: true };
          // return Validators.required(formControl); 
          // return null;
        }
        if (fdate <= currentdate) {
          // console.log("Valid Date")
          return null;
        }
        else{
        return null;
        }
      } else {
        return null;
      }
    };
  }

  static greaterThanfromDate(controlfdate: string, controltdate: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlfdate);
      const checkControl = controls.get(controltdate);

      if (checkControl?.value == "") {
        return null;
      }
      if (checkControl?.value != "") {
        // console.log(formControl.value)
        let now = Date.now();   
        let tdate = new Date(checkControl?.value)
        let fdate = new Date(control?.value)
        let currentdate = new Date(now);
        // console.log(tdate)
        if (tdate < fdate) {
          controls.get(controltdate)?.setErrors({ greaterThanfromDate: true });
          // console.log("Invalid Date")
          return { greaterThanfromDate: true };
          // return Validators.required(formControl); 
          // return null;
        }
        if (fdate <= tdate) {
          // console.log("Valid Date")
          return null;
        } 
        else {
          return null;
        }
      } else {
        return null;
      }
    };
  }
}