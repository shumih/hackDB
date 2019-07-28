import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  public readonly survey = [
    {
      question: 'Оцените состояние лифта. Лифту необходим космический ремонт?',
      answers: [
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
    },
    {
      question: 'Всегда ли в лифте есть свет?',
      answers: [
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
    },
    {
      question: 'Достаточно ли чисто в лифте?',
      answers: [
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
    },
    {
      question: 'Работают ли кнопки в лифте?',
      answers: [
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
    },
    {
      question: 'Замечали ли какие-нибудь проблемы с дверями лифта?',
      answers: [
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
    },
    {
      question: 'Опишите состояние цифрового табло',
      answers: [
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
          value: null,
        },
      ],
    },
    {
      question: 'Работает ли звук?',
      answers: [
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
          value: null,
        },
      ],
    },
  ];

  public surveyForm: FormArray = this.fb.array(
    this.survey.map((item, i) =>
      this.fb.group({ questionId: i, answer: [null, control => (control.value == null ? { required: true } : null)] })
    )
  );

  constructor(private fb: FormBuilder) {}
}
