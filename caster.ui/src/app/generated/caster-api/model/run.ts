/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon� and CERT� are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/

/**
 * Caster API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Apply } from './apply';
import { RunStatus } from './runStatus';
import { Plan } from './plan';


export interface Run { 
    /**
     * A unique identifier
     */
    id?: string;
    /**
     * The unique identifier of the Workspace this Run was created for
     */
    workspaceId?: string;
    /**
     * The time in UTC that this Run was initially created
     */
    createdAt?: Date;
    /**
     * Wether or not this Run was for a Destroy command
     */
    isDestroy?: boolean;
    status?: RunStatus;
    /**
     * Optional list of resources to constrain the affects of this Run to
     */
    targets?: Array<string> | null;
    plan?: Plan | null;
    /**
     * The Id of the Plan for this Run. Null if no Plan exists.
     */
    planId?: string | null;
    apply?: Apply | null;
    /**
     * The Id of the Apply for this Run. Null if no Apply exists.
     */
    applyId?: string | null;
}

