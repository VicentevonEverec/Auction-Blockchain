import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent 
{
  constructor() {
    window.alert("Privacidad y Protección de Datos: En Auction Blockchain, valoramos y respetamos tu privacidad. \n\
    Todos los datos personales que proporcionas al registrarte en nuestro sitio serán tratados con la máxima confidencialidad y \n\
    solo serán utilizados por el equipo de administración de la página de subastas con el único propósito de prevenir fraudes y garantizar la integridad de nuestras transacciones. \n\
    Queremos asegurarte que tu información será tratada con responsabilidad y de acuerdo con las leyes de protección de datos aplicables. \n\
    Mantendremos tus datos de manera segura y solo los compartiremos con terceros cuando sea necesario para cumplir con nuestras obligaciones legales o cuando tengamos tu consentimiento explícito para hacerlo. \n\
    Es importante destacar que, de cara al público, todos los usuarios serán tratados de manera anónima. Tu identidad no será revelada ni compartida en ningún momento. \n\
    Nuestra plataforma garantiza que todas las subastas y transacciones se realicen de forma confidencial y segura. \n\
    Si tienes alguna pregunta o inquietud sobre el manejo de tus datos personales, no dudes en contactarnos a través de nuestro centro de soporte. \n\
    Estamos comprometidos a proteger tu privacidad y a brindarte la mejor experiencia posible en nuestro sitio. \n\
    Al utilizar Auction Blockchain, aceptas nuestras políticas de privacidad y el tratamiento de tus datos personales de acuerdo con lo establecido en este aviso.");
  }

  userData = {
    name: "",
    surname: "",
    email: "",
    dni: "",
    wallet: ""
  }

  onRegister(): void
  {
    window.open("https://metamask.io/", "_blank");
  }

}
