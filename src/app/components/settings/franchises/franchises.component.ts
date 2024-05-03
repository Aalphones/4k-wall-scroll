import { Component, Input } from '@angular/core';
import { Franchise } from '@app/models';

@Component({
  selector: 'app-franchises',
  templateUrl: './franchises.component.html',
  styleUrl: './franchises.component.scss'
})
export class FranchisesComponent {
  @Input() data: Franchise[] | null = []
}
