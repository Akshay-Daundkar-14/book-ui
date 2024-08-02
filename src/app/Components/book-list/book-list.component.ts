import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() genreFilter: string = '';
  @Input() authorFilter: string = '';
  @Output() edit = new EventEmitter<BookModel>();
  @Output() delete = new EventEmitter<number>();
  @Output() filter = new EventEmitter<void>();
  @Output() sort = new EventEmitter<string>();

  onEdit(book: BookModel) {
    this.edit.emit(book);
  }

  onDelete(bookID: number) {
    this.delete.emit(bookID);
  }

  onSort(column: string) {
    this.sort.emit(column);
  }

  onFilter() {
    this.filter.emit();
  }

  trackByIndex(index: number, item: BookModel): number {
    return index;
  }
}
