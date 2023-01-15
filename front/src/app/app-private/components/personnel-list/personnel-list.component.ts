import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Personnel } from 'src/app/core/model/personnel';

@Component({
  selector: 'app-personnel-list',
  templateUrl: './personnel-list.component.html',
  styleUrls: ['./personnel-list.component.css']
})
export class PersonnelListComponent {

  columnsDisplay: string[] = ["id","prenom","nom","action1","action2"]
  @Input() personnels! : Personnel[];
  @Input() role! : string;
  @Output() deleted = new EventEmitter<Personnel>();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  delete(personnel : Personnel){
    this.deleted.emit(personnel);
    this.personnels.splice(this.personnels.indexOf(personnel),1);
  }
}
