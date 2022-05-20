import {environment} from '../../environments/environment';

export class Constants {
    static readonly NON_ID = '0'
    static readonly VERSION = 'version';
    static readonly CURRENT_USER = 'currentUser'
    static readonly ACCESS_TOKEN = 'Access-Token';
    static readonly EDITOR_CONFIG = {
        toolbarLocation: 'bottom',
        removeButtons: 'Underline,Subscript,Superscript,Strike,Image,Table,HorizontalRule,SpecialChar,PageBreak,Iframe,Outdent,Indent,Blockquote,CreateDiv,JustifyLeft,JustifyCenter,BidiLtr,BidiRtl,Language,JustifyRight,JustifyBlock,Anchor,Unlink,Styles,About,Maximize,TextColor,Format,Font,FontSize,ShowBlocks,BGColor,CopyFormatting,RemoveFormat,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Scayt,SelectAll,Find,Undo,Cut,Templates,Save,Source,NewPage,ExportPdf,Preview,Print,PasteFromWord,Paste,Copy,PasteText,Redo,Replace,Smiley',
        removePlugins: 'elementspath,resize',
        extraPlugins: 'emoji',
        editorplaceholder: "Description...",
        readOnly: false,
        contentsCss:[`${environment.websiteURL}/assets/css/contents.css`],
        toolbarGroups: [
            { name: 'insert', groups: [ 'insert' ] },
            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
            { name: 'paragraph', groups: [ 'list', 'indent'] },
            { name: 'links', groups: [ 'links' ] },
        ],
    }
}
