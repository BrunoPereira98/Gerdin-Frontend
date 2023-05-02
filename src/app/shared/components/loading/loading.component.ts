import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpProgressState } from './enum/HttpProgressStateEnum';
import { IHttpState } from './interface/IHttpState';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  public loading = false;
  @Input() public filterBy: string | null = null;
  @Output() public atualizar: EventEmitter<any> = new EventEmitter();

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.state.subscribe((progress: IHttpState) => {
      if (progress && progress.url) {
        if (!this.filterBy) {
          this.loading = (progress.state === HttpProgressState.start) ? true : false;
        } else if (this.obterSeFiltrado(progress, this.filterBy)) {
          this.loading = (progress.state === HttpProgressState.start) ? true : false;
        }

        this.atualizar.emit(!this.loading);
      }
    });
  }

  obterSeFiltrado(progress: IHttpState, filterBy: string) {
    const urls: any[] = filterBy.split(',');
    let filtrado;

    if (urls.length > 1) {
      urls.forEach(url => {
        if (progress.url.indexOf(url) !== -1) {
          filtrado =  true;
        }
      });

      return filtrado;
    } else {
      return progress.url.indexOf(urls[0]) !== -1
    }
  }

}
