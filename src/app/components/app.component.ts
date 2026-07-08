import { Component, OnInit, signal } from '@angular/core';
import { CharacterService } from '../services/Character.service';
import { Character } from '../models/Character.model';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [LowerCasePipe],
})
export class AppComponent implements OnInit {
  characters = signal<Character[]>([]);
  cargando = signal(true);
  error = signal('');

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe({
      next: (data) => {
        this.characters.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los personajes.');
        this.cargando.set(false);
      },
    });
  }
}
