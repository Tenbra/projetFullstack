import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationCenter } from 'src/app/core/model/vaccination-center';
import { AdminService } from 'src/app/core/service/admin.service';
import { VaccinationService } from 'src/app/core/service/vaccination.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-centers-edit',
  templateUrl: './centers-edit.component.html',
  styleUrls: ['./centers-edit.component.css']
})
export class CentersEditComponent {

  editForm! : FormGroup;
  centre! : VaccinationCenter;
  modifiedCenter! : VaccinationCenter;
  id! : number | null;

  constructor(
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: AdminService,
    private servicePublic: VaccinationService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if(this.id!==0){
      this.servicePublic.getVaccinationCenterById(this.id).subscribe(resp =>{
        this.servicePublic.center_by_id = resp.body
        this.servicePublic.center_by_id_etag = resp.headers.get("etag")
        this.centre = resp.body
        this.editForm = this.formbuilder.group({
          nom : [this.centre.nom, [Validators.required]],
          complement : [this.centre.adresse.complement, [Validators.required]],
          codepostal : [this.centre.adresse.codepostal, [Validators.required]],
          ville : [this.centre.adresse.ville, [Validators.required]],
        })
      }, error => {
        this.centre = this.servicePublic.center_by_id
        this.editForm = this.formbuilder.group({
          nom : [this.centre.nom, [Validators.required]],
          complement : [this.centre.adresse.complement, [Validators.required]],
          codepostal : [this.centre.adresse.codepostal, [Validators.required]],
          ville : [this.centre.adresse.ville, [Validators.required]],
        })
      });              
    }

    this.editForm = this.formbuilder.group({
      nom : [null, [Validators.required]],
      complement : [null, [Validators.required]],
      codepostal : [null, [Validators.required]],
      ville : [null, [Validators.required]]
    })
    
  }

  enregistrer(){

    this.modifiedCenter = {
      id : null,
      nom : this.editForm.value.nom,
      adresse : {
        codepostal : this.editForm.value.codepostal,
        ville : this.editForm.value.ville,
        complement : this.editForm.value.complement
      },
      reservations : [],
    }

    if (this.id!==0) {
      //update
      this.modifiedCenter.id = this.id;
      this.service.putCentre(this.modifiedCenter).subscribe(resp =>{
        this.servicePublic.center_by_id = resp.body
        this.servicePublic.center_by_id_etag = resp.headers.get("etag")
        this.centre = resp.body
      }, error => {
        if (error.status==412){
          //Coder la modale qui demande d'actualiser
          alert("La ressource n'est plus à jour, veuillez la recharger avant de la modifier")
        }
      });
      this.router.navigateByUrl("/private/home")
    }else{
      //save      
      this.service.saveCentre(this.modifiedCenter).subscribe(resp =>{
        this.servicePublic.center_by_id = resp.body
        this.servicePublic.center_by_id_etag = resp.headers.get("etag")
        this.centre = resp.body
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
    this.router.navigateByUrl("/private/centres")
  }

}
