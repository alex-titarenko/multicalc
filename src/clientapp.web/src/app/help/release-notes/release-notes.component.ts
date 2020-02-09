import { Component, OnInit, ViewChild } from '@angular/core';
import { ReleaseInfo, releaseNotes } from 'root/release-notes';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss']
})
export class ReleaseNotesComponent implements OnInit {
  public releaseNotes: ReleaseInfo[] = null;

  @ViewChild('notes')
  private notes: MatAccordion;

  ngOnInit() {
    this.releaseNotes = releaseNotes.sort((n1, n2) => n2.releaseDate.getTime() - n1.releaseDate.getTime());

    setTimeout(() => {
      this.expand();
    });
  }

  public expand() {
    this.notes.multi = true;
    this.notes.openAll();
  }

  public collapse() {
    this.notes.closeAll();
    this.notes.multi = false;
  }
}
