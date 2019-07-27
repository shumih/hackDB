import { Injectable, Type, Injector, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MapsLoaderService {
  private API_MAPS_URL = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
  public SCRIPT_MAPS_ID = 'YaScript';
  private SCRIPT_MAPS_TYPE = 'text/javascript';

  private _scriptLoading$: Observable<void>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
  ) {
  }

  public load(): Observable<void> {
    const script = document.createElement('script');
    script.type = this.SCRIPT_MAPS_TYPE;
    script.async = false;
    script.defer = true;
    script.id = this.SCRIPT_MAPS_ID;
    script.src = this.API_MAPS_URL;

    this._scriptLoading$ = new Observable<void>((subscribe) => {
      script.onload = () => { subscribe.next(); };
      script.onerror = () => { subscribe.error(); };
    });

    document.body.appendChild(script);
    return this._scriptLoading$;
  }

  public loadComponent(component: string | Type<any>, injector: Injector, options?: any): ComponentRef<any> {
    if (typeof component === 'string') {
      const factories = Array.from((this._componentFactoryResolver as any)._factories.keys());
      component = <Type<any>>factories.find((factory: any) => (factory.name === component));
    }

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(injector);

    if (options) {
      this._projectComponentInputs(componentRef, options);
    }

    return componentRef;
  }

  private _projectComponentInputs(component: ComponentRef<any>, options: any): ComponentRef<any> {
    if (options) {
      const props = Object.getOwnPropertyNames(options);
      for (const prop of props) {
        component.instance[prop] = options[prop];
      }
    }

    return component;
  }
}
