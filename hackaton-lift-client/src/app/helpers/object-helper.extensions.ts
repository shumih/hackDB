import { takeUntil } from 'rxjs/operators';
import { Renderer2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class ObjectHelper {
  public static clone = function(value) {
    const json = JSON.stringify(value);
    return JSON.parse(json);
  };

  public static compare = function(value, secondValue): boolean {
    // tslint:disable-next-line:prefer-const
    const leftChain = [];
    const rightChain = [];
    function compare2Objects(x, y) {
      let p;
      // tslint:disable-next-line:forin
      for (p in x) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
          return false;
        } else if (typeof y[p] !== typeof x[p]) {
          return false;
        }

        switch (typeof x[p]) {
          case 'object':
          case 'function':
            leftChain.push(x);
            rightChain.push(y);

            if (!compare2Objects(x[p], y[p])) {
              return false;
            }

            leftChain.pop();
            rightChain.pop();
            break;

          default:
            if (x[p] !== y[p]) {
              return false;
            }
            break;
        }
      }

      if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
        return true;
      }
      if (x === y) {
        return true;
      }
      if (
        (typeof x === 'function' && typeof y === 'function') ||
        (x instanceof Date && y instanceof Date) ||
        (x instanceof RegExp && y instanceof RegExp) ||
        (x instanceof String && y instanceof String) ||
        (x instanceof Number && y instanceof Number)
      ) {
        return x.toString() === y.toString();
      }

      if (!(x instanceof Object && y instanceof Object)) {
        return false;
      }

      if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
        return false;
      }

      if (x.constructor !== y.constructor) {
        return false;
      }

      if (x.prototype !== y.prototype) {
        return false;
      }

      if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
        return false;
      }

      for (p in y) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
          return false;
        } else if (typeof y[p] !== typeof x[p]) {
          return false;
        }
      }

      return true;
    }

    if (!compare2Objects(value, secondValue)) {
      return false;
    }
    return true;
  };

  public static untilDestroyed = (instance, destroyName = 'ngOnDestroy') => {
    return <T>(source: Observable<T>) => {
      const originalDestroy = instance[destroyName];
      if (ObjectHelper.isFunction(originalDestroy) === false) {
        throw new Error(`${instance.constructor.name} is using untilDestroyed but doesn't implement ${destroyName}`);
      }
      if (!instance['__takeUntilDestroy']) {
        instance['__takeUntilDestroy'] = new Subject();
        instance[destroyName] = function() {
          if (ObjectHelper.isFunction(originalDestroy)) {
            originalDestroy.apply(instance, arguments);
          }
          this['__takeUntilDestroy'].next(true);
          this['__takeUntilDestroy'].complete();
        };
      }
      return source.pipe(takeUntil<T>(instance['__takeUntilDestroy']));
    };
  }

  public static isFunction = (value) => {
    return typeof value === 'function';
  }

  public static getKeyEnumByValue = <T, K extends keyof T>(enumObject: T, enumValue: T[K] | string): K => {
    return Object.keys(enumObject).find((key) => enumObject[key] === enumValue) as K;
  }

  public static toggleClass = (renderer: Renderer2, element: Element, className: string): void => {
    if (element.classList.contains(className)) {
      renderer.removeClass(element, className);
    } else {
      renderer.addClass(element, className);
    }
  }

  public static restartAnimation = (renderer: Renderer2, element: HTMLElement, className: string): void => {
    renderer.removeClass(element, className);
    const a = element.offsetWidth;
    renderer.addClass(element, className);
    element.addEventListener('animationend', () => {
      renderer.removeClass(element, className);
    }, { once: true });
  }

  public static isEmpty = (obj: any) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  public static formatTime(time: number): string {
    if (!time) {
      return '0:00';
    }
    return [ Math.floor((time % 3600) / 60), ('00' + Math.round(time % 60)).slice(-2) ].join(':');
  }
}
