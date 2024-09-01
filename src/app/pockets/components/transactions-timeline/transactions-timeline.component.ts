import {Component, OnInit} from '@angular/core';
import {GroupEntity} from "../../../group/model/group.entity";
import {GroupService} from "../../../group/services/group.service";

@Component({
  selector: 'app-transactions-timeline',
  templateUrl: './transactions-timeline.component.html',
  styleUrl: './transactions-timeline.component.css'
})
export class TransactionsTimelineComponent implements OnInit{
  public groups: GroupEntity[] = [];
  constructor(private groupService: GroupService) { }

  getAllGroups() {
    this.groupService.getAll()
      .subscribe((groups: any) => {
        this.groups = groups;
      });
  }

  ngOnInit() {
    this.getAllGroups();

    this.groups.forEach(group => {
      group.paymentHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    this.groups.forEach(group => {
      group.paymentHistory = group.paymentHistory.slice(0, 3);
    });

  }



}
