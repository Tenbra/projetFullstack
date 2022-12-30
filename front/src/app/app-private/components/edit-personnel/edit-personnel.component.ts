import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Personnel } from 'src/app/core/model/personnel';
import { VaccinationCenter } from 'src/app/core/model/vaccination-center';
import { AdminService } from 'src/app/core/service/admin.service';
import { VaccinationService } from 'src/app/core/service/vaccination.service';

@Component({
  selector: 'app-edit-personnel',
  templateUrl: './edit-personnel.component.html',
  styleUrls: ['./edit-personnel.component.css']
})
export class EditPersonnelComponent implements OnInit {

  editForm! : FormGroup;
  selectedCentre! : VaccinationCenter;
  personnel! : Personnel;

  id! : number | null;
  centres! : VaccinationCenter[];

  constructor(
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: AdminService,
    private servicePublic: VaccinationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if(this.id!==0){
      this.service.getPersonnelById(this.id).subscribe( personnel =>{
        this.personnel = personnel;

        this.editForm = this.formbuilder.group({
          prenom : [this.personnel.prenom, [Validators.required]],
          nom : [this.personnel.nom, [Validators.required]],
          email : [this.personnel.email, [Validators.required, Validators.email]],
          password : [this.personnel.password, [Validators.required]],
          role : [null, [Validators.required]],
          centre : [this.personnel.centre, [Validators.required]]
        })

      });
    }

    this.editForm = this.formbuilder.group({
      prenom : [null, [Validators.required]],
      nom : [null, [Validators.required]],
      email : [null, [Validators.required, Validators.email]],
      password : [null, [Validators.required]],
      role : [null, [Validators.required]],
      centre : [null, [Validators.required]]
    })
    
    this.servicePublic.getAllVaccinationCenter().subscribe( centers =>{
      this.centres = centers;         
    })

    

    this.selectedCentre = this.service.Center;    
    
  }

  enregistrer(){
    
    let role : string[];

    switch (this.editForm.value.role) {
      case 'MEDECIN':
        role = ["MEDECIN"];
        break;
      case 'ADMIN':
        role = ["MEDECIN", "ADMIN"];
        break;
      case 'SUPER':
        role = ["MEDECIN", "ADMIN", "SUPER"];
        break;
      default:
        role = [];
    }

    this.personnel = {
      id : null,
      nom : this.editForm.value.nom,
      prenom: this.editForm.value.prenom,
      email : this.editForm.value.email,
      password : this.editForm.value.password,
      centre : this.centres.filter(element => element.id == this.editForm.value.centre)[0],
      roles : role
    }

    if (this.id!==0) {
      //update
      this.personnel.id = this.id;
      this.service.putPersonnel(this.personnel).subscribe(personnel => {
        this.router.navigateByUrl("/private/home")
      });
    }else{
      //save      
      this.service.savePersonnel(this.personnel).subscribe(personnel => {
        this.router.navigateByUrl("/private/home")
      });
    }
    
  }

  annuler(){
    this.router.navigateByUrl("/private/centre")
  }

  desactiver(){
    console.log(this.editForm);
    
  }

}
