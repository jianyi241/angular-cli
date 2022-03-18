import {Component, OnInit, ViewChild} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from "../../../../service/config.service";
import {GroupInfo} from "../../../../model/po/groupInfo";
import {CKEditorComponent} from "@ckeditor/ckeditor5-angular";
import {SupplierRepository} from "../../../../repository/supplier-repository";


@Component({
    selector: 'app-edit-group',
    templateUrl: './edit-group.component.html',
    styleUrls: ['./edit-group.component.less']
})
export class EditGroupComponent implements OnInit {
    id: string;
    group: GroupInfo = new GroupInfo();
    reminder: any;
    type: string;
    files: NgxFileDropEntry[] = [];
    Editor = ClassicEditor;
    config: {
        placeholder: 'Description',
    };
    @ViewChild('editor')
    editorComponent: CKEditorComponent;

    constructor(private route: Router, private activatedRoute: ActivatedRoute, public configService: ConfigService, private supplierRepository: SupplierRepository) {
        let state = this.route.getCurrentNavigation()?.extras?.state;
        this.reminder = state?.reminder;
    }

    ngOnInit(): void {
        // this.editorComponent.
    }

    init(): void {
        this.parseRouteParam();
        this.detail();
        this.initEditConfig();
    }

    parseRouteParam(): void {
        this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        })
    }

    detail(): void {
        this.supplierRepository.groupDetail(this.id).subscribe(res => {

        })
    }

    goBack(): void {
        this.route.navigateByUrl('/supplier/comparison/4', {
            state: this.reminder
        });
    }

    onReady(editor): void {
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
    }

    dropped(files: NgxFileDropEntry[]): void {
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

    fileOver(event): void {
        console.log(event);
    }

    fileLeave(event): void {
        console.log(event);
    }

    initEditConfig() {
    }
}
