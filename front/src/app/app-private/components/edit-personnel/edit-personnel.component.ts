import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Personnel } from 'src/app/core/model/personnel';
import { Role } from 'src/app/core/model/role';
import { VaccinationCenter } from 'src/app/core/model/vaccination-center';
import { AdminService } from 'src/app/core/service/admin.service';
import { VaccinationService } from 'src/app/core/service/vaccination.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

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
    protected service: AdminService,
    private servicePublic: VaccinationService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if(this.id!==0){
      this.service.getPersonnelById(this.id).subscribe(resp =>{        
        this.service.personnel_by_id = resp.body
        this.service.personnel_by_id_etag = resp.headers.get("etag")
        this.personnel = resp.body
        this.editForm = this.formbuilder.group({
          prenom : [this.personnel.prenom, [Validators.required]],
          nom : [this.personnel.nom, [Validators.required]],
          email : [this.personnel.email, [Validators.required, Validators.email]],
          password : [this.personnel.password, [Validators.required]],
          role : [null, [Validators.required]],
          centre : [this.personnel.centre, [Validators.required]]
        })
      }, error => {
        this.personnel = this.service.personnel_by_id
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
    
    this.servicePublic.getAllVaccinationCenter().subscribe( resp =>{
      this.servicePublic.all_center = resp.body
      this.servicePublic.all_center_etag = resp.headers.get("etag")
      this.centres = resp.body
    }, error => {
      this.centres = this.servicePublic.all_center
    });

    this.selectedCentre = this.service.User.centre;    
    
  }

  enregistrer(){
    
    let role : Role[];

    switch (this.editForm.value.role) {
      case 'MEDECIN':
        role = [{"role" :"MEDECIN"}];
        break;
      case 'ADMIN':
        role = [{"role" :"ADMIN"}];
        break;
      case 'SUPER':
        role = [{"role" :"SUPER_ADMIN"}];
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
      this.service.putPersonnel(this.personnel).subscribe(resp =>{
        this.service.personnel_by_id = resp.body
        this.service.personnel_by_id_etag = resp.headers.get("etag")
        this.personnel = resp.body
      }, error => {
        if (error.status==412){
          this.openDialog("La ressource n'est plus à jour, la page va etre rechargé")
        }  
      });
      this.router.navigateByUrl("/private/home")
    }else{
      //save      
      this.service.savePersonnel(this.personnel).subscribe(resp =>{
        this.service.personnel_by_id = resp.body
        this.service.personnel_by_id_etag = resp.headers.get("etag")
        this.personnel = resp.body
      }, error => {
        if (error.status==412){
          this.openDialog("La ressource n'est plus à jour, la page va etre rechargé")
        }
      });
      this.router.navigateByUrl("/private/home")
    }
    
  }

  openDialog(text : string) {
    this.service.message = text
    this.dialog.open(DialogComponent);
  }

  annuler(){
    this.router.navigateByUrl("/private/centre/0")
  }

}
