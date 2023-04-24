import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TesteComunicacaoRoutingModule } from './teste-comunicacao-routing.module';
import { StoreModule } from '@ngrx/store';
import { testeComunicacaoReducer } from './store/teste-comunicacao.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TesteComunicacaoEffect } from './store/teste-comunicacao.effects';
import { TesteComunicacaoComponent } from './teste-comunicacao.component';

@NgModule({
  declarations: [TesteComunicacaoComponent],
  imports: [
    CommonModule,
    TesteComunicacaoRoutingModule,
    StoreModule.forFeature('testeComunicacao', testeComunicacaoReducer),
    EffectsModule.forFeature([TesteComunicacaoEffect]),
  ],
})
export class TesteComunicacaoModule {}
