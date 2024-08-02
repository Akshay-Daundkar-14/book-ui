import { Component, OnInit } from '@angular/core';
import { BookModel } from '../../Model/book';
import { FormsModule, NgForm } from '@angular/forms';
import { BookService } from '../../Services/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  constructor(
    private _bookService: BookService,
    private _toasterService: ToastrService
  ) {}

  bookList: BookModel[] = [];
  book: BookModel = {
    title: '',
    author: '',
    genre: '',
    publishedYear: undefined,
    price: undefined,
  };
  sortColumn: string = 'Title';
  sortOrder: string = 'ASC';
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

  ngOnInit(): void {
    this.getBookList();
  }

  onSubmit(form: NgForm): void {
    if (this.editMode) {
      this._bookService.updateBook(this.book).subscribe((res) => {
        this.editMode=false;
        this.getBookList();
        this.reset();
        this._toasterService.warning('Book Updated Successfully', 'Updated!!');
      });
    } else {
      this._bookService.addBook(this.book).subscribe((res) => {
        this.getBookList();
        this.reset();
        this._toasterService.success('Book Added Successfully', 'Success!!');
      });
    }
  }

  reset(){
    this.book = {};
  }

  onResetForm(form:NgForm) {
    form.reset();
    this.editMode=false;
    this.getBookList();
  }

  onEdit(book: BookModel) {
    this.book = book;
    this.editMode = true;
    console.log('BOOK FOR EDIT', book);
  }

  onDelete(bookID:any) {
    let isConfirm =  confirm("Are you sure? You want to delete this book?");
    if(isConfirm){
      this._bookService.deleteBook(bookID).subscribe((res)=>{
        this.getBookList();
        this._toasterService.error('Book Deleted Successfully', 'Deleted!!');
      });
    }    
  }

  getBookList() {
    console.log("BookList Called");
    this._bookService.getBooks(this.book.genre,this.book.author,this.sortColumn,this.sortOrder).subscribe((res) => {
      this.bookList = res;
      console.log(res)
    });
  }

  onSort(column: string): void {
    this.sortColumn = column;
    this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    this.getBookList();
  }

  onFilter(): void {
    console.log("Filter Get CAlled",this.book.genre);
    this.getBookList();
  }
}
