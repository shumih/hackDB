import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  displayedColumns = ['id', 'address'];

  public mapQuestionToTitle = [
    'Оцените состояние лифта. Лифту необходим космический ремонт?',
    'Всегда ли в лифте есть свет?',
    'Достаточно ли чисто в лифте?',
    'Работают ли кнопки в лифте?',
    'Замечали ли какие-нибудь проблемы с дверями лифта?',
    'Бывало ли во время поездки в лифте',
    'Опишите состояние цифрового табло',
    'Работает ли звук?',
  ];

  public mapAnswerToTitle = [
    [
      {
        text: 'Да, лифт выглядит ужасно',
        value: -2,
      },
      {
        text: 'Скорее да',
        value: -1,
      },
      {
        text: 'Скорее нет',
        value: 1,
      },
      {
        text: 'Нет, лифт в отличном состоянии',
        value: 2,
      },
    ],
    [
      {
        text: 'Да, в лифте всегда светло',
        value: 2,
      },
      {
        text: 'Да, но часть ламп не работает',
        value: 1,
      },
      {
        text: 'Нет, лампы работают в с перебоями',
        value: -1,
      },
      {
        text: 'Нет, очень часто в лифте нет света',
        value: -2,
      },
    ],
    [
      {
        text: 'Да, в лифте абсолютно чисто',
        value: 2,
      },
      {
        text: 'Да, но иногда есть посторонние предметы',
        value: 1,
      },
      {
        text: 'Нет, в лифте редко убираются',
        value: -1,
      },
      {
        text: 'Нет, в лифте всегда грязно',
        value: -2,
      },
    ],
    [
      {
        text: 'Да, все кнопки работают',
        value: 2,
      },
      {
        text: 'Все кнопки работают, но часто не светятся',
        value: 1,
      },
      {
        text: 'Часть кнопок не работает',
        value: -1,
      },
      {
        text: 'Все кнопки не работают',
        value: -2,
      },
    ],
    [
      {
        text: 'Нет, все работает отлично',
        value: 2,
      },
      {
        text: 'Иногда двери застревают/скрипят',
        value: 1,
      },
      {
        text: 'Двери не реагируют на кнопки',
        value: -1,
      },
      {
        text: 'Да, дверям необходим ремонт',
        value: -2,
      },
    ],
    [
      {
        text: 'Сильные шумы',
        value: -1,
      },
      {
        text: 'Вибрация',
        value: -2,
      },
      {
        text: 'Рывки',
        value: -3,
      },
      {
        text: 'Ничего из вышеперечисленного',
        value: 0,
      },
    ],
    [
      {
        text: 'Табло работает',
        value: 2,
      },
      {
        text: 'Табло иногда зависает',
        value: 1,
      },
      {
        text: 'Табло вообще не работает',
        value: -2,
      },
      {
        text: 'В моем лифте нет цифрового табло',
        value: 0,
      },
    ],
    [
      {
        text: 'Звук работает',
        value: 2,
      },
      {
        text: 'Звук иногда пропадает',
        value: 1,
      },
      {
        text: 'Звук вообще не работает',
        value: -2,
      },
      {
        text: 'В моём лифте нет цифрового табло',
        value: 0,
      },
    ],
  ];

  public details: any | null = null;

  public data$ = this.store
    .collection('surveys')
    .valueChanges()
    .pipe(
      map((data: any) =>
        data.map((item, i) => {
          return {
            address: item.address,
            id: i,
            questions: item.questions,
          };
        })
      )
    );

  constructor(public store: AngularFirestore, private cdRef: ChangeDetectorRef) {}

  public navigateToDetails(details: string): void {
    this.setWithChangeDetection({ details });
  }

  public navigateToTable(): void {
    this.setWithChangeDetection({ details: null });
  }

  public setWithChangeDetection(data: Partial<AppComponent>): void {
    Object.assign(this, data);
    this.cdRef.detectChanges();
  }

  getPadick(address: any) {
    return address;
  }

  getStucks() {
    return Math.round((Math.random() * 100) % 30);
  }

  getAnswerTitle(i: number, q: number): string {
    const bax = this.mapAnswerToTitle[i];
    const tfoo = bax.find(itm => itm.value === q);

    return tfoo ? tfoo.text : 'Без ответа';
  }
}
