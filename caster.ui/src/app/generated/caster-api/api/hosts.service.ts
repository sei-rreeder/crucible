/**
 * Crucible
 * Copyright 2020 Carnegie Mellon University.
 * NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
 * Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
 * [DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
 * Carnegie Mellon(R) and CERT(R) are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
 * DM20-0181
 */

/**
 * Caster API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1.1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent,
  HttpParameterCodec,
} from '@angular/common/http';
import { CustomHttpParameterCodec } from '../encoder';
import { Observable } from 'rxjs';

import { CreateHostCommand } from '../model/createHostCommand';
import { EditHostCommand } from '../model/editHostCommand';
import { Host } from '../model/host';
import { ProblemDetails } from '../model/problemDetails';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root',
})
export class HostsService {
  protected basePath = 'http://localhost';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();
  public encoder: HttpParameterCodec;

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
    if (configuration) {
      this.configuration = configuration;
    }
    if (typeof this.configuration.basePath !== 'string') {
      if (typeof basePath !== 'string') {
        basePath = this.basePath;
      }
      this.configuration.basePath = basePath;
    }
    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
  }

  /**
   * Create a new Host.
   * @param CreateHostCommand
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createHost(
    CreateHostCommand?: CreateHostCommand,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Host>;
  public createHost(
    CreateHostCommand?: CreateHostCommand,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Host>>;
  public createHost(
    CreateHostCommand?: CreateHostCommand,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Host>>;
  public createHost(
    CreateHostCommand?: CreateHostCommand,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let headers = this.defaultHeaders;

    // authentication (oauth2) required
    if (this.configuration.accessToken) {
      const accessToken =
        typeof this.configuration.accessToken === 'function'
          ? this.configuration.accessToken()
          : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'text/plain',
      'application/json',
      'text/json',
    ];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json',
      'text/json',
      'application/_*+json',
    ];
    const httpContentTypeSelected:
      | string
      | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.post<Host>(
      `${this.configuration.basePath}/api/hosts`,
      CreateHostCommand,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * Delete an Host.
   * @param id ID of an Host.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteHost(
    id: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public deleteHost(
    id: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public deleteHost(
    id: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public deleteHost(
    id: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling deleteHost.'
      );
    }

    let headers = this.defaultHeaders;

    // authentication (oauth2) required
    if (this.configuration.accessToken) {
      const accessToken =
        typeof this.configuration.accessToken === 'function'
          ? this.configuration.accessToken()
          : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    return this.httpClient.delete<any>(
      `${this.configuration.basePath}/api/hosts/${encodeURIComponent(
        String(id)
      )}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * Update an Host.
   * @param id ID of an Host.
   * @param EditHostCommand
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public editHost(
    id: string,
    EditHostCommand?: EditHostCommand,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Host>;
  public editHost(
    id: string,
    EditHostCommand?: EditHostCommand,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Host>>;
  public editHost(
    id: string,
    EditHostCommand?: EditHostCommand,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Host>>;
  public editHost(
    id: string,
    EditHostCommand?: EditHostCommand,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling editHost.'
      );
    }

    let headers = this.defaultHeaders;

    // authentication (oauth2) required
    if (this.configuration.accessToken) {
      const accessToken =
        typeof this.configuration.accessToken === 'function'
          ? this.configuration.accessToken()
          : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'text/plain',
      'application/json',
      'text/json',
    ];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json',
      'text/json',
      'application/_*+json',
    ];
    const httpContentTypeSelected:
      | string
      | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.put<Host>(
      `${this.configuration.basePath}/api/hosts/${encodeURIComponent(
        String(id)
      )}`,
      EditHostCommand,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * Get all Hosts.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAllHosts(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<Host>>;
  public getAllHosts(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<Host>>>;
  public getAllHosts(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<Host>>>;
  public getAllHosts(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let headers = this.defaultHeaders;

    // authentication (oauth2) required
    if (this.configuration.accessToken) {
      const accessToken =
        typeof this.configuration.accessToken === 'function'
          ? this.configuration.accessToken()
          : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'text/plain',
      'application/json',
      'text/json',
    ];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    return this.httpClient.get<Array<Host>>(
      `${this.configuration.basePath}/api/hosts`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * Get a single Host.
   * @param id ID of an Host.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getHost(
    id: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Host>;
  public getHost(
    id: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Host>>;
  public getHost(
    id: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Host>>;
  public getHost(
    id: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling getHost.'
      );
    }

    let headers = this.defaultHeaders;

    // authentication (oauth2) required
    if (this.configuration.accessToken) {
      const accessToken =
        typeof this.configuration.accessToken === 'function'
          ? this.configuration.accessToken()
          : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'text/plain',
      'application/json',
      'text/json',
    ];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    return this.httpClient.get<Host>(
      `${this.configuration.basePath}/api/hosts/${encodeURIComponent(
        String(id)
      )}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }
}
