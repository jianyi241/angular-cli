import { Component, OnInit } from '@angular/core';
import {Constants} from "../../../model/constants";
import {LoginTipModalComponent} from "../../auth/login-tip-modal/login-tip-modal.component";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SaveTemplateTipModalComponent} from "../save-template-tip-modal/save-template-tip-modal.component";
import {NgxValidatorConfig} from "@why520crazy/ngx-validator";
import {LoginUser} from "../../../model/user";
import {ComparisonSaveTemplateInfo} from "../../../model/po/comparisonTemplateInfo";
import {ReviewRepository} from "../../../repository/review-repository";
import {HttpResult} from "../../../model/common/http-result";
import {ToastRepository} from "../../../repository/toast-repository";

@Component({
  selector: 'app-save-template-modal',
  templateUrl: './save-template-modal.component.html',
  styleUrls: ['./save-template-modal.component.less']
})
export class SaveTemplateModalComponent implements OnInit {
  config = {...Constants.EDITOR_CONFIG,editorplaceholder:'Enter notes'};

  public templateInfo = new ComparisonSaveTemplateInfo();
  validatorConfig: NgxValidatorConfig = {
    validationMessages: {
      templateName: {
        required: 'Template name is required.',
      },
    },
    validateOn: 'submit'
  };

  constructor(
      private modalService: NgbModal,
      private activeModal: NgbActiveModal,
      private reviewRepository: ReviewRepository,
      private toastRepository: ToastRepository,) { }

  ngOnInit(): void {
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }

  saveTemplate(): void {
    this.templateInfo.id='';
    this.reviewRepository.saveFeatureTemplate(this.templateInfo).subscribe((result: HttpResult<ComparisonSaveTemplateInfo>)=>{
      if (result.statusCode !== 200) {
        if(result.statusCode === 201){
          this.saveOverwriteTip();
          return;
        }

        else{
          this.toastRepository.showDanger(result.msg, 'toastTop');
          return;
        }
      }
      this.dismiss();
      this.toastRepository.showSuccess('Template saved successfully.', 'toastTop');


    })
  }

  saveOverwriteTip():void{
    const modalRef = this.modalService.open(SaveTemplateTipModalComponent, {
      windowClass: 'tip-popup-template-modal',
      centered: true
    });
    modalRef.componentInstance.title = 'Overwrite the existing template?';
    modalRef.componentInstance.info = 'This name already exists. Overwrite existing template?';
    modalRef.componentInstance.btnText = 'Yes, overwrite it';
    modalRef.componentInstance.btnCancelText = 'No, I’ll change template name';
    modalRef.result.then((result) => {
      this.templateInfo.overwrite=true;
      this.saveTemplate();
    }, (reason) => {
    });
  }
}
