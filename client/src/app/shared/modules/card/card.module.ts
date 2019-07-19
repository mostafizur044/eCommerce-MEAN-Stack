import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressBarModule
  ],
  exports: [CardComponent]
})
export class CardModule { }
