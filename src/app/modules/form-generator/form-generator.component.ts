import {Component, EventEmitter, Input, OnChanges, OnInit, Output, Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
    transform(value, args: string[]): any {
        const keys = [];
        for (const key in value) {
            keys.push({key: key, value: value[key]});
        }
        return keys;
    }
}

@Component({
    selector: 'ng-form-generator',
    templateUrl: './form-generator.component.html',
    styleUrls: ['./form-generator.component.scss']
})
export class FormGeneratorComponent implements OnInit, OnChanges {

    @Input() structure;
    @Input() lookup;
    @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();


    public formData: any = null;
    public pageData: any = null;
    loading: boolean = null;
    saveInfo: any = {show: false, msg: ''};

    validFormData = false;
    display: any = [];
    error = true;
    dialogueCustomisation = false;

    constructor() {
    }

    ngOnInit() {


    }

    ngOnChanges(changes: any) {
        console.log('Changes');
        this.formData = null;
        this.formData = this.structure;
        this.initTemplate();
    }

    submitTheForm() {
        console.log('Emit', this.formData);
        this.formSubmit.emit(this.formData);
    }


    initTemplate() {
        // if (this.structure.view == null) {
        this.structure.view = 'view-side';
        // }
        this.structure.submit = {name: 'Submit', view: 'btn'};
        this.structure.reset = {name: 'Reset', view: 'btn btn-warning', display: true};
        this.display = [];
        this.display.preview = {_display: false};
        console.log('template initialted');
        this.structure.sections.forEach((s, i) => {
            console.log('looping section');
            if (i === 0) {
                this.display[i] = {_display: true};
            } else {
                this.display[i] = {_display: false};
            }
            console.log('looping section');
            if (s.view == null) {
                this.formData.sections[i].view = 'form-box wp25';
            }

            if (this.formData.sections[i].forms && this.formData.sections[i].forms.length > 0) {

                this.formData.sections[i].forms.forEach((section, index) => {

                    if (this.formData.sections[i].forms[index].type == null && this.formData.sections[i].forms[index].type == null) {
                        console.log('Here');
                        this.formData.sections[i].forms[index].type = 'text';
                        this.formData.sections[i].forms[index].label = 'label-' + i + '-' + index;

                    }
                    this.validFormData = false;
                });
            }
        });
    }

    resetSection(i) {
        if (this.formData.sections[i].form && this.formData.sections[i].form.length > 0) {
            this.formData.sections[i].form.forEach((section, index) => {

                this.formData.sections[i].form[index].label = 'label';
                this.formData.sections[i].form[index].placeholder = null;
                this.formData.sections[i].form[index].minlength = null;
                this.formData.sections[i].form[index].maxlength = null;
                this.formData.sections[i].form[index].type = 'text';
                this.formData.sections[i].form[index].required = null;
                this.formData.sections[i].form[index].options = [];
                this.validFormData = false;
            });
        }
    }

    setSelectOptions(value, sectionIndex, formIndex) {
        if (value && value.trim().length > 0) {
            this.formData.sections[sectionIndex].forms[formIndex].options.push({
                value: value.trim().split(' ').join('_').toLowerCase(),
                label: value.trim()
            });
        }

    }

    removeSelectOption(i, j, oi) {
        const val = this.formData.sections[i].forms[j].options[oi];
        this.formData.sections[i].forms[j].options.forEach((option, index) => {
            if (index === oi) {
                console.log('Delete here');
                this.formData.sections[i].forms[j].options.splice(index, 1);
            }
        });

    }

    resetTypes(value: string, sectionIndex, formIndex) {
        if (value === 'searchFilter' || value === 'searchAddList') {
            this.formData.sections[sectionIndex].forms[formIndex].meta = {
                lookup: null,
                fields: [],
                _c: false
            };

        } else {
            this.formData.sections[sectionIndex].forms[formIndex].meta = null;
        }


        this.formData.sections[sectionIndex].forms[formIndex].options = [];


    }


    validateError(invalid: boolean) {
        return invalid;
    }

    resetLookUp(i, j, value) {
        if (value.length > 0) {
            this.formData.sections[i].forms[j].meta.fields = [];
            value.forEach(item => {
                this.formData.sections[i].forms[j].meta.fields.push({name: item, selected: false, type: false, displayed: false});
            });
        } else {
            console.log('Lookup value is not an array');
        }


    }


    addToLookUpOptions(i, j, value) {
        if (this.formData.sections[i].forms[j].meta && this.formData.sections[i].forms[j].meta.fields && value !== -1) {
            console.log('value');
            this.formData.sections[i].forms[j].meta.fields.forEach((selcted, index) => {
                if (selcted.name === value) {
                    this.formData.sections[i].forms[j].meta.fields[index] = {name: value, selected: true, type: false, displayed: false};
                }
            });
        }

    }


    removelookupOption(i, j, oi) {
        if (this.formData.sections[i].forms[j].meta.fields[oi]) {
            this.formData.sections[i].forms[j].meta.fields[oi].selected = false;
        }
    }

    showLookUpCustomisation(i, j, lookup) {
        if (this.formData.sections[i].forms[j].meta) {
            this.formData.sections[i].forms[j].meta['_c'] = true;
        }
    }

    closeSearchCustomisation(i, j, lookup) {
        if (this.formData.sections[i].forms[j].meta) {
            this.formData.sections[i].forms[j].meta['_c'] = false;
        }
    }
}

