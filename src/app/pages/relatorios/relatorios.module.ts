import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RelatoriosComponent } from './relatorios.component';
import { MatCommonModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { RelatoriosRoutingModule } from './relatorios-routing.module';

@NgModule({
  declarations: [
    RelatoriosComponent
  ],
  imports: [
    MatCommonModule,
    FormsModule,
    SharedModule,
    RelatoriosRoutingModule,
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
export class RelatoriosModule { }
