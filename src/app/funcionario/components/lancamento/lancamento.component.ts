import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Tipo } from '../../../shared';
import * as moment from 'moment';

declare var navigator: any;

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  private dataAtualEn: string;
  dataAtual: string;
  geoLocation: string;
  ultipoTipoLancamento: string;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
    this.dataAtualEn = moment().format('YYYY-MM-DD HH:mm:ss');
    this.obterGeoLocation();
    this.ultipoTipoLancamento = '';
    this.obterUltimoLancamento();
  }

  cadastrar(tipo: Tipo) {
    alert(`Tipo: ${tipo}, dataAtualEn: ${this.dataAtualEn}, geolocation: ${this.geoLocation}`);
  }

  iniciarTrabalho() {
    this.cadastrar(Tipo.INICIO_TRABALHO);
  }

  terminarTrabalho() {
    this.cadastrar(Tipo.TERMINO_TRABALHO);
  }

  iniciarAlmoco() {
    this.cadastrar(Tipo.INICIO_ALMOCO);
  }

  terminarAlmoco() {
    this.cadastrar(Tipo.TERMINO_ALMOCO);
  }

  obterGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( 
        position => this.geoLocation = `${position.coords.latitude},${position.coords.longitude}`);
    }

    return '';
  }

  obterUltimoLancamento() {}

  obterUrlMapa(): string {
    return "https://www.google.com/maps/search/?api=1&query=" + this.geoLocation;
  }

  exibirInicioTrabalho(): boolean {
    return this.ultipoTipoLancamento == '' || this.ultipoTipoLancamento == Tipo.TERMINO_TRABALHO;
  }

  exibirTerminoTrabalho(): boolean {
    return this.ultipoTipoLancamento == Tipo.INICIO_TRABALHO || this.ultipoTipoLancamento == Tipo.TERMINO_ALMOCO;
  }

  exibirInicioAlmoco(): boolean {
    return this.ultipoTipoLancamento == Tipo.INICIO_TRABALHO;
  }

  exibirTerminoAlmoco(): boolean {
    return this.ultipoTipoLancamento == Tipo.INICIO_ALMOCO;
  }

}
