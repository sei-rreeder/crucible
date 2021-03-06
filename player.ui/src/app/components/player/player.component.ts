/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon� and CERT� are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExercisesService } from '../../services/exercises/exercises.service';
import { AuthService } from '../../services/auth/auth.service';
import { TeamsService } from '../../services/teams/teams.service';
import { TeamData } from '../../models/team-data';
import { SystemMessageService } from '../../services/system-message/system-message.service';
import { SettingsService } from '../../services/settings/settings.service';
import { Title } from '@angular/platform-browser';
import { LoggedInUserService } from '../../services/logged-in-user/logged-in-user.service';
import { AdminExerciseEditComponent } from '../admin-app/admin-exercise-search/admin-exercise-edit/admin-exercise-edit.component';
import { ExerciseService } from '../../swagger-codegen/s3.player.api/api/exercise.service';
import { Exercise } from '../../swagger-codegen/s3.player.api/model/models';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  providers: [AuthService],
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  public exerciseGuid: string;
  public teamGuid: string;
  public userGuid: string;
  public userToken: string;

  public opened: boolean;
  public username: string;
  public exercise: Exercise;
  public team: string;
  public teams: Array<TeamData>;

  public canEdit = false;
  public exerciseName = '';
  public topBarColor = '#b00';

  constructor(
    private route: ActivatedRoute,
    private exercisesService: ExercisesService,
    private exerciseService: ExerciseService,
    private authService: AuthService,
    private loggedInUserService: LoggedInUserService,
    private teamsService: TeamsService,
    private systemMessageService: SystemMessageService,
    private settingsService: SettingsService,
    private titleService: Title,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    this.opened = true;
    this.teams = new Array<TeamData>();

    // Set the topbar color from config file
    this.topBarColor = this.settingsService.AppTopBarHexColor;

    // Set the page title from configuration file
    this.titleService.setTitle(this.settingsService.AppTitle);

    this.loggedInUserService.loggedInUser.subscribe(loggedInUser => {

      if (loggedInUser == null) {
        return;
      }

      // Get login information
      this.username = loggedInUser.name;
      this.userGuid = loggedInUser.id;
      this.userToken = this.authService.getAuthorizationToken();

      // Get the exercise GUID from the URL that the user is entering the web page on
      this.route.params.subscribe(params => {
        this.exerciseGuid = params['id'];

        // Tell the rest of the subscribed components to update their exercise guid
        this.exercisesService.currentExerciseGuid.next(this.exerciseGuid);

        // Get the exercise object from the exercise GUID
        this.exerciseService.getExercise(this.exerciseGuid).subscribe(exercise => {
          this.exercise = exercise;
          this.exerciseName = exercise.name;
          this.canEdit = exercise.canManage;

          // Get the teams for the exercise and filter the members.
          this.teamsService.getUserTeamsByExercise(this.userGuid, exercise.id).subscribe(teams => {
            this.teams = teams.filter(t => t.isMember);
            // There should only be 1 primary member, set that value for the current login
            const myTeam = teams.filter(t => t.isPrimary)[0];
            if (myTeam !== undefined) {
              this.team = myTeam.name;
              this.teamGuid = myTeam.id;
              console.log('Primary Team id:  ' + myTeam.id);
            } else {
              this.systemMessageService.displayMessage('Error', 'Primary team membership was not found.  Please contact administrator.');
              console.log('Team membership was not found!!!');
            }
          });
        });
      });
    });

    this.team = '';
  }

  /**
   * Logout of the Identity server
   */
  logout(): void {
    this.authService.logout();
  }

  /**
   * Set the primary team instance by the team Guid.  This is only valid when a user belongs to multiple
   * teams.  If a new primary team is set int he database, the page must be reloaded
   * @param newTeamGuid
   */
  setPrimaryTeam(newTeamGuid) {
    if (newTeamGuid !== this.teamGuid) {
      this.exercisesService.setPrimaryTeamId(this.userGuid, newTeamGuid).subscribe(team =>{
        window.location.reload();
      });
    }
  }

  /**
   * Called to open the edit exercise dialog window
   */
  editExercise() {
    const dialogRef = this.dialog.open(AdminExerciseEditComponent);
    dialogRef.afterOpen().subscribe(r => {
      dialogRef.componentInstance.resetStepper();
      dialogRef.componentInstance.updateApplicationTemplates();
      dialogRef.componentInstance.updateExercise();
      dialogRef.componentInstance.exercise = this.exercise;
    });

    dialogRef.componentInstance.editComplete.subscribe(() => {
      dialogRef.close();
    });
  }
}

