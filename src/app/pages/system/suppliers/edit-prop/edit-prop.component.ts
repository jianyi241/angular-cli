import {Component, OnInit} from '@angular/core';
import {GroupInfo} from "../../../../model/po/groupInfo";
import {Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {PropertyInfo} from "../../../../model/po/propertyInfo";
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";

@Component({
    selector: 'app-edit-prop',
    templateUrl: './edit-prop.component.html',
    styleUrls: ['./edit-prop.component.less']
})
export class EditPropComponent implements OnInit {
    prop: PropertyInfo;
    type: string;
    reminder: any;
    files;
    constructor(private route: Router, public configService: ConfigService) {
        let state = this.route.getCurrentNavigation().extras.state;
        this.prop = state.prop;
        this.reminder = state.reminder;
    }

    ngOnInit(): void {
    }

    goBack(): void {
        this.route.navigate(['/supplier/comparison/4'], {
            state: this.reminder
        })
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
