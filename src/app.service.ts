import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const date = new Date();
    const hello = () => {
      if (date.getHours() >= 0 && date.getHours() < 12) {
        return 'Bom dia!';
      } else if (date.getHours() >= 12 && date.getHours() < 18) {
        return 'Boa tarde!';
      } else {
        return 'Boa noite!';
      }
    };

    return `Olá! ${hello()} hoje é ${date.toLocaleDateString('pt-BR')}, e são ${date.toLocaleTimeString('pt-BR')}.`;
  }
}
