<<<<<<< HEAD
import { provideZonelessChangeDetection } from '@angular/core';
=======
>>>>>>> 23cd44078d53afd8391259a323a488d4121c168c
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
<<<<<<< HEAD
      providers: [provideZonelessChangeDetection()]
=======
>>>>>>> 23cd44078d53afd8391259a323a488d4121c168c
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
<<<<<<< HEAD
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, FRONTEND');
  });
});
=======
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, tasks-ui');
  });
});
>>>>>>> 23cd44078d53afd8391259a323a488d4121c168c
