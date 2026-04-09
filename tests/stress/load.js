/**
 * k6 Load / Stress Test
 * Usage: k6 run -e BASE_URL=https://your-site.vercel.app tests/stress/load.js
 *
 * Stages:
 *   Smoke   → 1 user, 1 min (confirm nothing is broken)
 *   Load    → ramp to 50 users over 2 min, hold 3 min
 *   Stress  → ramp to 100 users (finds breaking point)
 *   Soak    → 30 users for 10 min (finds memory leaks)
 *
 * Uncomment the stage set you want to run.
 */

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const pageLoadTime = new Trend('page_load_time');

// ── CHOOSE YOUR TEST TYPE ─────────────────
export const options = {
  // SMOKE TEST (quick sanity check)
  stages: [
    { duration: '30s', target: 1 },
    { duration: '1m',  target: 1 },
    { duration: '10s', target: 0 },
  ],

  // LOAD TEST (uncomment to use)
  // stages: [
  //   { duration: '1m',  target: 20 },
  //   { duration: '3m',  target: 50 },
  //   { duration: '1m',  target: 0  },
  // ],

  // STRESS TEST (uncomment to use)
  // stages: [
  //   { duration: '2m',  target: 100 },
  //   { duration: '5m',  target: 100 },
  //   { duration: '2m',  target: 0   },
  // ],

  thresholds: {
    'http_req_duration':        ['p(95)<800'],   // 95% of requests under 800ms
    'http_req_duration{page:homepage}': ['p(99)<2000'],
    'http_req_failed':          ['rate<0.01'],   // error rate < 1%
    'errors':                   ['rate<0.05'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  group('homepage', function () {
    const start = Date.now();
    const res = http.get(BASE_URL, {
      tags: { page: 'homepage' },
    });
    pageLoadTime.add(Date.now() - start);

    const ok = check(res, {
      'status is 200':        (r) => r.status === 200,
      'body not empty':       (r) => r.body !== null && r.body.length > 0,
      'response time < 1s':   (r) => r.timings.duration < 1000,
      'no server error text': (r) => !r.body.includes('Internal Server Error'),
    });

    errorRate.add(!ok);
  });

  // Test other pages if they exist
  group('static assets', function () {
    const res = http.get(`${BASE_URL}/favicon.ico`);
    check(res, { 'favicon loads': (r) => r.status === 200 || r.status === 204 });
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    'tests/stress/results/summary.json': JSON.stringify(data, null, 2),
  };
}
