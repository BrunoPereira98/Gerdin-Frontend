import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {Router} from '@angular/router';
import { TabLink } from './models/tab-link';

@Component({
  selector: 'app-menu-tab',
  templateUrl: './menu-tab.component.html',
  styleUrls: ['./menu-tab.component.scss']
})
export class MenuTabComponent implements OnInit {
  activeLinkIndex = -1;
  tabLinks: TabLink[] = []
//       {
//           label: 'Consulta Instalações',
//           link: './consulta-instalacoes',
//           index: 4
//       },
//       {
//           label: 'Cálculo de Restrições',
//           link: './calculo-restricoes',
//           index: 0
//       }, {
//           label: 'Execução/Acompanhamento',
//           link: './execucao-acompanhamento',
//           index: 1
//       }
//       , {
//           label: 'Relatórios',
//           link: './relatorios',
//           index: 3
//       },
//   ];

  constructor(private router: Router) {
  }

  ngOnInit() {
      let i = 0;
      this.router.config.forEach(menu => {
		let label = (menu.title != undefined ? menu.title : 'N/A');
		let link = './' + (menu.path != undefined ? menu.path : 'N/A');

		if ('teste-comunicacao' !== menu.path) {
			this.tabLinks.push(new TabLink(label.toString(), link.toString(), i++));
		}
      });

      this.router.events.subscribe(() => {
          const tab = this.tabLinks.find(tab => tab.link === '.' + this.router.url);
          this.activeLinkIndex = tab ? tab.index : 0;
      });
  }

  onTabChanged(event: MatTabChangeEvent): void {
      this.router.navigate([this.tabLinks[event.index].link]);
  }

  visualizarAbas() {
      return this.tabLinks.find(item =>
          item.link.substring(2, window.location.hash.length) === window.location.hash.substring(2, window.location.hash.length)
      ) ? 'block' : 'none';
  }
}
