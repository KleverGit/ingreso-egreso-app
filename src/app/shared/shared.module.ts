import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent
    ],
    imports: [
        RouterModule
    ],
    providers: [
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent
    ]
})
export class SharedModule {

}
