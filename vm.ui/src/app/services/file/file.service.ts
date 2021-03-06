/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon� and CERT� are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/


import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SettingsService } from '../settings/settings.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class FileService {

    private exerciseId: string;

    constructor(
        private http: HttpClient,
        private settings: SettingsService,
        private router: Router,
      ) {
        this.exerciseId = this.router.routerState.snapshot.root.firstChild.params['exerciseId'];
      }

    public uploadIso(isForAll: boolean, file: File) {
        const scope = isForAll ? 'exercise' : 'team';
        const payload: FormData = new FormData();
        payload.append('size', file.size.toString());
        payload.append('scope', scope);
        payload.append(file.name, file);
        return this.http.request(
            new HttpRequest('POST', `${this.settings.ApiUrl}/exercises/${this.exerciseId}/isos`, payload, { reportProgress: true }));
    }
}

