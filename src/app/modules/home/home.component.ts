import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// export class User {
//   public institution: object
// } 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

 // model = new User();
 
 // Institution: object[] = [
    Institution = [
    {id: 'PUL', name: "Princeton"},
       {id: 'CUL', name: "Columbia"},
       {id: 'NYPL', name: "New York Public Library"},
       {id: 'HTC', name: "HTC"}
  ];

  

  constructor(private formBuilder: FormBuilder,private router: Router) { }

  
  
  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      institution: ['', Validators.required]
  });
  }

  // onSubmit(dd) { 
  //   console.log("lll",dd);
  //   if(dd==='HTC'){
  //     this.router.navigate(['/login']);
  //   }
  //  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
     var formVal=this.registerForm.value;
     //console.log("kkk",formVal.institution)
        if(formVal.institution==='HTC'){
      this.router.navigate(['/dashboard/search']);
    }
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}

getinTouch: any[] = [ {
  "for": "Princeton users, Role administration, please contact",
  "url": 'mailto:Recapproblems@princeton.edu',
  "name":'Recapproblems@princeton.edu'
},

{
  "for": "Princeton users, Technical support, please contact",
  "url": 'mailto:mzelesky@princeton.edu',
  "name":'mzelesky@princeton.edu'
  
},
{
  "for": "Columbia users, contact",
  "url": 'mailto:recap.admin@library.columbia.edu',
  "name":'recap.admin@library.columbia.edu'
},
{
  "for": "NYPL users, contact",
  "url": 'mailto:ReCAPinterface@nypl.org',
  "name":'ReCAPinterface@nypl.org'
}

];

}
