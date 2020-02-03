import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Data } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';

export interface RouteMetaConfig {
  brandName: string;
}

@Injectable({
  providedIn: 'root'
})
export class RouteMetaService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private meta: Meta) { }

  public init(config: RouteMetaConfig) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap((route) => route.data)
    ).subscribe(data => {
      this.updateRouteMeta(data, config);
    });
  }

  private updateRouteMeta(routeData: Data, config: RouteMetaConfig) {
    this.setTitle(routeData['title'], config.brandName);
    this.setDescription(routeData['description']);
    this.setTwitterCard(routeData['image'] === true);
    this.setImage(routeData['image']);
    this.setNoIndex(routeData['noIndex']);
  }

  private setTitle(newTitle: string, brandName: string) {
    const formattedTitle = newTitle ? `${ newTitle } | ${ brandName }` : brandName;

    this.title.setTitle(formattedTitle);
    this.meta.updateTag({ name: 'twitter:title', content: formattedTitle });
    this.meta.updateTag({ property: 'og:title', content: formattedTitle });

    // Windows Store App
    if ('Windows' in window) {
      const appView = (<any>window).Windows.UI.ViewManagement.ApplicationView.getForCurrentView();
      appView.title = newTitle;
    }
  }

  private setDescription(description: string) {
    if (description) {
      this.meta.updateTag({ name: 'description', content: description});
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
    } else {
      this.meta.removeTag('name="description"');
      this.meta.removeTag('name="twitter:description"');
      this.meta.removeTag('property="og:description"');
    }
  }

  private setTwitterCard(hasImage: boolean) {
    const cardType = hasImage ? 'summary_large_image' : 'summary';
    this.meta.updateTag({ name: 'twitter:card', content: cardType });
  }

  private setImage(imageUrl: string) {
    if (imageUrl) {
      this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
      this.meta.updateTag({ property: 'og:image', content: imageUrl });
    } else {
      this.meta.removeTag('name="twitter:image"');
      this.meta.removeTag('property="og:image"');
    }
  }

  private setNoIndex(noIndex: boolean) {
    if (noIndex === true) {
      this.meta.updateTag({ name: 'robots', content: 'noindex' });
    } else {
      this.meta.removeTag('name="robots"');
    }
  }
}
