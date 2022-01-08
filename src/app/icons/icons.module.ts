import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from 'angular-feather';

import { Camera, Heart, Github, Mail } from 'angular-feather/icons';

const icons = {
  Camera,
  Heart,
  Github, 
  Mail
};



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons)
  ]
})
export class IconsModule { }
