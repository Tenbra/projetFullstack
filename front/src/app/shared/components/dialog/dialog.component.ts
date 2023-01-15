import { Component } from '@angular/core';
import { AdminService } from 'src/app/core/service/admin.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  message! : string;

  constructor(private service: AdminService,
    ) {}

  ngOnInit(): void {
    this.message = this.service.message;
  }
  
}
