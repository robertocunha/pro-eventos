import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public filteredEventos: any = [];

  imageWidth: number = 150;
  imageMargin: number = 2;
  imageCollapsed: boolean = false;
  private _filter: string = '';

  public get filter(): string {
    return this._filter;
  }

  public set filter(value: string) {
    this._filter = value;
    this.filteredEventos = this.filter ? this.filterEventos(this.filter) : this.eventos;
  }

  filterEventos(filterBy: string): any {
    filterBy = filterBy.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string; }) =>
      evento.tema.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filterBy) !== -1
      )
    }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  public toggleImageVisibility(): void {
    this.imageCollapsed = !this.imageCollapsed;
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => {
        this.eventos = response;
        this.filteredEventos = this.eventos;
      },
      error => console.log(error)
    );
  }
}
