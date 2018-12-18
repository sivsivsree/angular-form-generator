import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FormGeneratorComponent} from './form-generator.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [FormGeneratorComponent],
    exports: [FormGeneratorComponent]
})
export class FormGeneratorModule {
}
