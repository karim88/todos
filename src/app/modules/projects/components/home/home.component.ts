import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProjectsService} from '../../../../services/projects.service';
import {ToastrService} from 'ngx-toastr';
import {TasksService} from '../../../../services/tasks.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projects: any[];
  project: any;
  tasks: any[];
  projectId: number;
  taskName: string;
  filterName: string;
  toEdit: number;
  modalRef: BsModalRef;

  constructor(public projectService: ProjectsService,
              public taskService: TasksService,
              public toastr: ToastrService,
              private modalService: BsModalService) {
    this.taskName = '';
    this.filterName = 'all';
    this.toEdit = 0;
    this.project = {
      name: '',
      description: ''
    };
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data.data;
      this.projectId = this.projects.length > 0 ? this.projects[0].id : 0;
      this.getTasks();
    }, err => {
      this.toastr.warning('error while fetching the list of projects!');
    });
  }

  addProject() {
    const data = {
      name: this.project.name,
      description: this.project.description
    };
    this.projectService.addProject(data).subscribe((d: any) => {
      this.projects.push(d.data);
      this.projectId = this.projects.length > 0 ? this.projects[0].id : 0;
      this.modalRef.hide();
      this.project = {
        name: '',
        description: ''
      };
    }, error1 => {
      this.toastr.error('project not added!');
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getTasks = () => {
    this.taskService.getTasks(this.projectId).subscribe(data => {
      this.tasks = data.data.map(d => {
        d['new_name'] = d.name;
        return d;
      });
      console.log(this.tasks);
    }, err => {
      this.toastr.warning('error while fetching tasks!');
    });
  }

  archiveFinished = () => {
    this.taskService.archiveTask({
      project_id: this.projectId
    }).subscribe(data => this.getTasks(), err => console.log(err));
  }

  newTask = () => {
    if (this.taskName.trim() === '') {
      return;
    }
    const data = {
      name: this.taskName,
      project_id: this.projectId
    };
    this.taskService.addTask(data)
      .subscribe(d => {
        d['data']['new_name'] = d['data']['name'];
        this.tasks.push(d.data);
        this.taskName = '';
        console.log(this.tasks);
      }, err => {
        this.toastr.warning('Badly the task is not added!!');
      });
  }

  editTask = (task: any) => {
    this.toEdit = 0;
    if (task.new_name.trim() === '' || task.new_name.trim() === task.name) {
      task.new_name = task.name;
      return;
    }
    task.name = task.new_name;
    this.taskService.editTask(task.id, task)
      .subscribe(d => {
        this.tasks = this.tasks.map(t => {
          if (t.id === d.data.id) {
            d['data']['new_name'] = d['data']['name'];
            return d.data;
          }
          return t;
        });
        console.log(this.tasks);
      }, err => {
        this.toastr.warning('Badly the task is not edited!!');
      });
  }

  finishTask = (task: any) => {
    task.is_finished = !task.is_finished;
    this.taskService.editTask(task.id, task)
      .subscribe(d => {
        this.tasks = this.tasks.map(t => {
          if (t.id === d.data.id) {
            console.log('ok');
            d['data']['new_name'] = d['data']['name'];
            return d.data;
          }
          return t;
        });
        console.log(this.tasks);
      }, err => {
        this.toastr.warning('Badly the task is not edited!!');
      });
  }

  deleteTask = (id: number) => {
    this.taskService.deleteTask(id)
      .subscribe(d => {
        this.tasks = this.tasks.filter(t => t.id !== id);
        console.log(this.tasks);
      }, err => {
        this.toastr.warning('Badly the task is not edited!!');
      });
  }

  haveFinished = () => {
      return this.tasks.filter(d => d.is_finished).length !== 0;
  }

  itemsLeft = () => {
    const items = this.tasks.filter(d => !d.is_finished).length;
    if (items === 0) {
      return 'No item left';
    } else if (items === 1) {
      return 'One item left';
    } else {
      return `${items} items left`;
    }
  }

  filtedTasks = (task: any, filterName: string) => {
    if (filterName === 'active') {
      return task.is_finished === 0;
    } else if (filterName === 'completed') {
      return task.is_finished === 1;
    }
    return true;
  }
}

