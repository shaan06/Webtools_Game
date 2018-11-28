import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { PlayComponent } from './play/play.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkoutService } from './workout.service';
import { StoryComponent } from './story/story.component';
import { PowerComponent } from './power/power.component';
import { TimeoutComponent } from './timeout/timeout.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    PlayComponent,
    StoryComponent,
    PowerComponent,
    TimeoutComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [WorkoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
