import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BookModel } from '../../Model/book';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './book-list.component.html',
})
export class BookListComponent {
  @Input() bookList: BookModel[] = [];
  @Output() editBook = new EventEmitter<BookModel>();
  @Output() deleteBook = new EventEmitter<any>();
  @Output() addBook = new EventEmitter<void>();

  onEdit(book: BookModel) {
    this.editBook.emit(book);
  }

  onDelete(bookID: any) {
    this.deleteBook.emit(bookID);
  }

  onAddBook() {
    this.addBook.emit();
  }
}
