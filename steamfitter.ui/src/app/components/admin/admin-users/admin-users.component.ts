/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon� and CERT� are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Sort, PageEvent } from '@angular/material';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User, Permission, UserPermission } from 'src/app/swagger-codegen/dispatcher.api/model/models';
import { PermissionService } from 'src/app/swagger-codegen/dispatcher.api/api/api';
import {Router, ActivatedRoute} from '@angular/router';
import { AdminUsersService } from '../admin-users.service';
import { paginateRows } from 'src/app/datasource-utils';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
  @Input() filterControl: FormControl;
  @Input() userList: User[];
  @Input() permissionList: Permission[];
  @Input() pageSize: number;
  @Input() pageIndex: number;
  @Output() removeUserPermission = new EventEmitter<UserPermission>();
  @Output() addUserPermission = new EventEmitter<UserPermission>();
  @Output() addUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<User>();
  @Output() sortChange = new EventEmitter<Sort>();
  @Output() pageChange = new EventEmitter<PageEvent>();
  addingNewUser = false;
  newUser: User = { id: '', name: ''};
  isLoading = false;

  constructor(
    private router: Router,
    private adminUsersService: AdminUsersService,
    activatedRoute: ActivatedRoute,
    private permissionService: PermissionService
  ) {
  }

  hasPermission(permissionId: string, user: User) {
    return user.permissions.some(p => p.id === permissionId);
  }

  toggleUserPermission(user: User, permissionId: string) {
    const userPermission: UserPermission = {userId: user.id, permissionId: permissionId};
    if (this.hasPermission(permissionId, user)) {
      this.removeUserPermission.emit(userPermission);
    } else {
      this.addUserPermission.emit(userPermission);
    }
  }

  addUserRequest(isAdd: boolean) {
    if (isAdd) {
      this.addUser.emit(this.newUser);
    }
    this.newUser.id = '';
    this.newUser.name = '';
    this.addingNewUser = false;
  }

  deleteUserRequest(user: User) {
    this.deleteUser.emit(user);
  }

  applyFilter(filterValue: string) {
    this.filterControl.setValue(filterValue);
  }

  sortChanged(sort: Sort) {
    this.sortChange.emit(sort);
  }

  paginatorEvent(page: PageEvent) {
    this.pageChange.emit(page);
  }

  paginateUsers(users: User[], pageIndex: number, pageSize: number) {
    if (!users) {
      return [];
    }
    const startIndex = pageIndex * pageSize;
    const copy = users.slice();
    return copy.splice(startIndex, pageSize);
  }

}

