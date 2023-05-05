import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CalculoRestricoesComponent } from './calculo-restricoes.component';
import { MatCommonModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CalculoRestricoesRoutingModule } from './calculo-restricoes-routing.module';
import { CommonModule } from '@angular/common';
import { CalculoComponent } from './components/calculo/calculo.component';

@NgModule({
  declarations: [
    CalculoRestricoesComponent,
    CalculoComponent
  ],
  imports: [
    CommonModule,
    MatCommonModule,
    FormsModule,
    SharedModule,
    CalculoRestricoesRoutingModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always', appearance: 'outline' },
    },
  ],
})
export class CalculoRestricoesModule { }
