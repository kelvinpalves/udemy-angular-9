import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { CadastroPj } from '../../models';

import {  CpfValidator } from '../../../../shared/validators';

@Component({
  selector: 'app-cadastrar-pj',
  templateUrl: './cadastrar-pj.component.html',
  styleUrls: ['./cadastrar-pj.component.css']
})
export class CadastrarPjComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, CpfValidator ]],
      razaoSocial: ['', [Validators.required, Validators.minLength(5)]],
      cnpj: ['', [Validators.required]],
    });
  }

  cadastrarPj() {
    const cadastroPj: CadastroPj = this.form.value;
    alert(JSON.stringify(cadastroPj));
  }

}
