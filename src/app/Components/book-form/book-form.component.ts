import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BookModel } from '../../Model/book';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule,FormsModule],  
  templateUrl: './book-form.component.html',
})
export class BookFormComponent {
  
  @Input() book: BookModel = { title: '', author: '', genre: '', publishedYear: undefined, price: undefined };
  @Input() genreList: string[] = [];
  @Input() editMode: boolean = false;
  @Output() formSubmit = new EventEmitter<NgForm>();
  @Output() formReset = new EventEmitter<NgForm>();

  onSubmit(form: NgForm) {
    this.formSubmit.emit(form);
  }

  onResetForm(form: NgForm) {
    this.formReset.emit(form);
  }
}
