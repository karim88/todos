import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() tasks: any;
  @Input() task: any;
  @Input() taskName: string;
  @Input() projectId: number;
  @Input() toEdit: number;
  @Output() editEmitter = new EventEmitter<any>();
  @Output() finishEmitter = new EventEmitter<any>();
  @Output() deleteEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  editTask = (task: any) => {
    this.editEmitter.emit(task);
  }

  finishTask = (task: any) => {
    this.finishEmitter.emit(task);
  }

  deleteTask = (id: number) => {
    this.deleteEmitter.emit(id);
  }
}
