import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorPopupComponent } from '../popups/error-popup/error-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  constructor(private apiService: ApiService, private router: Router, private dialog: MatDialog) { }

  displayedColumns: string[] = ['username', 'emailId', 'phoneNumber', 'address', 'dob', 'gender', 'action'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  count = 0;
  filter: any = {};
  error: "";

  getUsers(from) {
    let obj: any = {
      sort: this.sort.direction == 'asc'? 1: (this.sort.direction == 'desc'? -1: ''),
      sortBy: this.sort.active,
      offset: this.paginator.pageIndex,
      limit: this.paginator.pageSize,
      filter: this.filter
    };
    this.apiService.getUsers(obj).subscribe((result) => {
      if (result && result.status == "Success") {
        this.dataSource = new MatTableDataSource<any>(result.data);
        if(from == "init") {
          this.dataSource.paginator = this.paginator;
        }
        this.dataSource.sort = this.sort;
        this.count = result.count;
      } else {
        this.error = result.message;
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getUsers('init');
    this.paginator.page
    .pipe(
        tap(() => this.getUsers('pagination'))
    )
    .subscribe();
  }

  deleteUser(id) {
    const dialog = this.dialog.open(ErrorPopupComponent, {
      panelClass: 'error-popup-dialog',
      data: {
          title: 'Delete User',
          message: 'Are you sure want to delete?'
      },
      disableClose: true
    });
    dialog.afterClosed().subscribe((result) => {
      if(result && result.message == "ok") {
        let obj: any = {
          id: id,
        };
        this.apiService.deleteUser(obj).subscribe((result) => {
          if (result && result.status == "Success") {
            this.getUsers('init');
          } else {
            this.error = result.message;
          }
        })
      }
    });
    
  }

  addUser() {
    this.router.navigateByUrl("admin/add-user");
  }

  editUser(element) {
    this.router.navigateByUrl("admin/edit-user/" + element._id);
  }

}
