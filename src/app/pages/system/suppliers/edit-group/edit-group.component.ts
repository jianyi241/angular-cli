import { Component, OnInit } from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Router} from '@angular/router';


@Component({
    selector: 'app-edit-group',
    templateUrl: './edit-group.component.html',
    styleUrls: ['./edit-group.component.less']
})
export class EditGroupComponent implements OnInit {

    public files: NgxFileDropEntry[] = [];
    public Editor = ClassicEditor;
    public config = {
        placeholder: 'Description',
    };
    constructor(  private router: Router) { }

    ngOnInit(): void {
    }

    public goBack(): void{
        this.router.navigate(['/']);
    }

    public onReady( editor ): void {
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
    }

    public dropped(files: NgxFileDropEntry[]): void {
        this.files = files;
        for (const droppedFile of files) {

            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {

                    // Here you can access the real file
                    console.log(droppedFile.relativePath, file);

                });
            } else {
                // It was a directory (empty directories are added, otherwise only files)
                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        }
    }

    public fileOver(event): void{
        console.log(event);
    }

    public fileLeave(event): void {
        console.log(event);
    }

}
