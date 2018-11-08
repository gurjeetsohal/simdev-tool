import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { BasicFeatureComponent } from './modules/basic-feature/basic-feature.component';
import { ConcatenationToolComponent } from './modules/concatenation-tool/concatenation-tool.component';
import { RebaseToolComponent } from './modules/rebase-tool/rebase-tool.component';

const routes: Routes = [
    {
        path: 'settings',
        component: UserSettingsComponent,
        outlet: 'content-container'
    },
    {
        path: 'basic-feature',
        component: BasicFeatureComponent,
        outlet: 'content-container'
    },
    {
        path: 'concatenation-tool',
        component: ConcatenationToolComponent,
        outlet: 'content-container'
    },
    {
        path: 'rebase-tool',
        component: RebaseToolComponent,
        outlet: 'content-container'
    },
    {
        path: '',
        component: BasicFeatureComponent,
        outlet: 'content-container'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(
                    routes,
                    {useHash: true}
            )],
    exports: [RouterModule]
})
export class AppRoutingModule { }
