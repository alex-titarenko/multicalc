import { Angulartics2Settings } from 'angulartics2';

import { environment } from 'src/environments/environment';

export const angularticsConfig: Partial<Angulartics2Settings> = {
  developerMode: !environment.production,
  gst: {
    trackingIds: [ environment.googleAnalyticsTrackingId ],
    customMap: {
      'dimension1': 'display_mode'
    }
  }
};
