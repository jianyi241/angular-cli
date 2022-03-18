import { Component, OnInit } from '@angular/core';
import {NgxFileDropEntry} from "ngx-file-drop";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.less']
})
export class FeatureFormComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];
  public Editor = ClassicEditor;

  constructor() { }

  ngOnInit(): void {
  }

}
