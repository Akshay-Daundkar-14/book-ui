import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BookModel } from '../../Model/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule,FormsModule],  
  templateUrl: './book-form.component.html',
})
export class BookFormComponent {
  @Input() book: BookModel = { title: '', author: '', genre: '', publishedYear: undefined, price: undefined };
  @Input() editMode: boolean = false;
  @Input() genreList: string[] = [];
  @Output() submit = new EventEmitter<NgForm>();
  @Output() reset = new EventEmitter<void>();

  onSubmit(form: NgForm) {
    this.submit.emit(form);
  }

  onResetForm() {
    this.reset.emit();
  }
}
