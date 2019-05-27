import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, of } from 'rxjs';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';
import { baseURL } from '../shared/baseurl';

import { MenuComponent } from './menu.component';
import { Router } from '@angular/router';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    const dishServiceStub = {
      getDishes: function(): Observable<Dish[]> {
        return of(DISHES);
      }
    }
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        RouterTestingModule.withRoutes([{path: 'menu', component:MenuComponent}])
      ],
      declarations: [ MenuComponent ],
      providers: [
        {provide: DishService, useValue: dishServiceStub},
        {provide: 'baseURL', useValue: baseURL}
      ]
    })
    .compileComponents();

    const dishservice = TestBed.get(DishService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dishes should have 4 items', () => {
    expect(component.dishes.length).toBe(4);
  })

  it('should use dishes in the template', () => {
    fixture.detectChanges();

    let debug: DebugElement;
    let element: HTMLElement;

    debug = fixture.debugElement.query(By.css('h1'));
    element = debug.nativeElement;

    expect(element.textContent).toContain(DISHES[0].name.toUpperCase());
  })
});
