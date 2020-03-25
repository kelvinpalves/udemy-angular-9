import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CpfValidator, CnpjValidator } from '../../../../shared/validators';

import { CadastroPf } from '../../models';
import { CadastrarPfService } from '../../services';

@Component({
  selector: 'app-cadastrar-pf',
  templateUrl: './cadastrar-pf.component.html',
  styleUrls: ['./cadastrar-pf.component.css']
})
export class CadastrarPfComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private service: CadastrarPfService
  ) { }

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['Kelvin', [Validators.required, Validators.minLength(3)]],
      email: ['email@gmail.com', [Validators.required]],
      senha: ['123456', [Validators.required, Validators.minLength(6)]],
      cpf: ['02873938013', [Validators.required, CpfValidator]],
      cnpj: ['93315190000621', [Validators.required, CnpjValidator]],
    });
  }

  cadastrarPf() {
    const cadastroPf: CadastroPf = this.form.value;

    this.service.cadastrar(cadastroPf)
      .subscribe(
        data => {
          console.log(JSON.stringify(data));
          const msg: string = "Realize o login para acessar o sistema.";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/login']);
        },
        err => {
          console.log(JSON.stringify(err));
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            console.log(err.error);
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );

    return false;
  }
}
