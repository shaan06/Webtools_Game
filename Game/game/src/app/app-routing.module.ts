import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlayComponent } from './play/play.component';
import { StoryComponent } from './story/story.component';
import { PowerComponent } from './power/power.component';
import { TimeoutComponent } from './timeout/timeout.component';

const routes: Routes = [
  // {path: '', component: StoryComponent},
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'play', component: PlayComponent},
  {path: 'story', component: StoryComponent},
  {path: 'power', component: PowerComponent},
  {path: 'timeout', component: TimeoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
