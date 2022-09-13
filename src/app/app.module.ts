import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { ToolbarPrincipalComponent } from './toolbar-principal/toolbar-principal.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { GetDataPalletsComponent } from './get-data-pallets/get-data-pallets.component';
import { TableDataPalletsComponent } from './table-data-pallets/table-data-pallets.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { dataEffects } from './state/effects/data.efect';
import { ClienteComponent } from './select-filter/cliente/cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VariedadComponent } from './select-filter/variedad/variedad.component';
import { TableClienteFilterComponent } from './table-cliente-filter/table-cliente-filter.component';
import { TableVariedadFilterComponent } from './table-variedad-filter/table-variedad-filter.component';
import { ProductorComponent } from './select-filter/productor/productor.component';
import { TableProductorFilterComponent } from './table-productor-filter/table-productor-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    ToolbarPrincipalComponent,
    GetDataPalletsComponent,
    TableDataPalletsComponent,
    ClienteComponent,
    VariedadComponent,
    TableClienteFilterComponent,
    TableVariedadFilterComponent,
    ProductorComponent,
    TableProductorFilterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatSelectModule,
    NgxCsvParserModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ name: 'TEST' }),
    EffectsModule.forRoot([dataEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
