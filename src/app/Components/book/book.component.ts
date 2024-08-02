import { Component, OnInit } from '@angular/core';
import { BookModel } from '../../Model/book';
import { NgForm } from '@angular/forms';
import { BookService } from '../../Services/book.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BookListComponent } from '../book-list/book-list.component';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, BookListComponent, BookFormComponent],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  bookList: BookModel[] = [];
  book: BookModel = {
    title: '',
    author: '',
    genre: '',
    publishedYear: undefined,
    price: undefined,
  };
  editMode: boolean = false;
  genreList: string[] = [
    'Motivational',
    'Science Fiction',
    'Drama',
    'Comedy',
    'Self Help',
    'Adventure',
    'Horror',
    'History',
  ];

  constructor(private _bookService: BookService, private _toasterService: ToastrService) {}

  ngOnInit(): void {
    this.getBookList();
  }

  onSubmit(form: NgForm): void {
    if (this.editMode) {
      this._bookService.updateBook(this.book).subscribe((res) => {
        this.editMode = false;
        this.getBookList();
        this.resetForm();
        this._toasterService.success('Book Updated Successfully', 'Updated!!');
      });
    } else {
      this._bookService.addBook(this.book).subscribe((res) => {
        this.getBookList();
        this.resetForm();
        this._toasterService.success('Book Added Successfully', 'Success!!');
      });
    }
  }

  resetForm() {
    this.book = {
      title: '',
      author: '',
      genre: '',
      publishedYear: undefined,
      price: undefined,
    };
  }

  onResetForm(form: NgForm) {
    form.reset();
    this.editMode = false;
    this.getBookList();
  }

  onEdit(book: BookModel) {
    this.book = book;
    this.editMode = true;
  }

  onDelete(bookID: any) {
    let isConfirm = confirm("Are you sure? You want to delete this book?");
    if (isConfirm) {
      this._bookService.deleteBook(bookID).subscribe((res) => {
        this.getBookList();
        this._toasterService.error('Book Deleted Successfully', 'Deleted!!');
      });
    }
  }

  getBookList() {
    this._bookService.getBooks().subscribe((res) => {
      this.bookList = res;
    });
  }

  onAddBook() {
    this.resetForm();
    this.editMode = false;
  }
}
