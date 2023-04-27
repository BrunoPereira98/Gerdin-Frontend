import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaInstalacoesComponent } from './consulta-instalacoes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ConsultaInstalacoesRoutingModule } from './consulta-instalacoes-routing.module';
import {OnsDataModule} from "../../shared/components/ons-data/ons-data.module";



@NgModule({
  declarations: [
    ConsultaInstalacoesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ConsultaInstalacoesRoutingModule,
    ReactiveFormsModule,
    OnsDataModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always', appearance: 'outline' },
    },
  ],
})
export class ConsultaInstalacoesModule { }
