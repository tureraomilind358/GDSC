import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipListbox } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTreeModule } from '@angular/material/tree';

// Shared Components
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

// Shared Pipes
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

// Shared Directives
import { HighlightDirective } from './directives/highlight.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSnackBarModule,
  MatMenuModule,
  MatBadgeModule,
  MatDividerModule,
  MatChipsModule,
  MatProgressBarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatTabsModule,
  MatStepperModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatButtonToggleModule,
  MatBottomSheetModule,
  MatGridListModule,
  MatTreeModule
];

const SHARED_COMPONENTS = [
  NavbarComponent,
  SidebarComponent,
  FooterComponent,
  CardComponent,
  LoadingSpinnerComponent,
  ConfirmDialogComponent
];

const SHARED_PIPES = [
  SafeHtmlPipe,
  FormatDatePipe,
  TruncatePipe
];

const SHARED_DIRECTIVES = [
  HighlightDirective,
  ClickOutsideDirective
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ...MATERIAL_MODULES,
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES,
    ...SHARED_DIRECTIVES
  ],
  exports: [
    CommonModule,
    RouterModule,
    ...MATERIAL_MODULES,
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES,
    ...SHARED_DIRECTIVES
  ]
})
export class SharedModule { }
