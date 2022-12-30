import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Personnel } from 'src/app/core/model/personnel';
import { VaccinationCenter } from 'src/app/core/model/vaccination-center';
import { AdminService } from 'src/app/core/service/admin.service';
import { VaccinationService } from 'src/app/core/service/vaccination.service';

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
  personnels! : Personnel[];

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
      this.servicePublic.getVaccinationCenterById(this.id).subscribe( center =>{
        this.centre = center;        
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
    
    /*
    this.service.getPersonnelByCenter(this.id).subscribe( personnels =>{
      this.personnels = personnels;         
    })    
    */
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
      this.service.putCentre(this.modifiedCenter).subscribe(center => {
        this.router.navigateByUrl("/private/home")
      });
    }else{
      //save      
      this.service.saveCentre(this.modifiedCenter).subscribe(center => {
        this.router.navigateByUrl("/private/home")
      });
    }
    
  }

  annuler(){
    this.router.navigateByUrl("/private/centres")
  }

}
