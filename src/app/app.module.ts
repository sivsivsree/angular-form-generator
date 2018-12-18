import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormGeneratorModule} from './modules/form-generator/form-generator.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormGeneratorModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
