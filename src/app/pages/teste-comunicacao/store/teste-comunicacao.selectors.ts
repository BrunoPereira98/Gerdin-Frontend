import { createFeatureSelector } from '@ngrx/store';
import { TesteComunicacao } from '../models/teste-comunicacao';

export const testeComunicacaoSelector = createFeatureSelector<TesteComunicacao>('testeComunicacao');
