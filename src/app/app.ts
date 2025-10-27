<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, signal } from '@angular/core';
>>>>>>> 23cd44078d53afd8391259a323a488d4121c168c
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
<<<<<<< HEAD
  template: `<router-outlet></router-outlet>`
})
export class App {
  constructor (){
    console.log(' cargado desde APP');
  }

}


const startApplication = async () => {
  try {
    
    // Aquí continúa el resto de tu lógica de aplicación
    // initializeApp();
    // renderUI();
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
  }
};

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', startApplication);
} else {

  startApplication();
}
=======
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tasks-ui');
}
>>>>>>> 23cd44078d53afd8391259a323a488d4121c168c
