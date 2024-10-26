import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgIf,NgFor } from '@angular/common';

@Component({
  selector: 'app-ver-comentarios-modal',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './ver-comentarios-modal.component.html',
  styleUrl: './ver-comentarios-modal.component.css'
})
export class VerComentariosModalComponent {
  constructor(public dialogRef: MatDialogRef<VerComentariosModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { comentarios: string[] }  ) {}

  // Método para cerrar el modal
  cerrarModal(): void {
    this.dialogRef.close();
  }

}
