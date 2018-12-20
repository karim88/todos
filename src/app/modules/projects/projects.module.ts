import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { HomeComponent } from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {TaskComponent} from './components/task/task.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [HomeComponent, TimeAgoPipe, TaskComponent]
})
export class ProjectsModule { }
