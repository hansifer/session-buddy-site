import type { Testimonial } from '@/types';

import davidWilsonImage from '@/assets/images/screenshot.png';

export const testimonials = [
  {
    name: 'David Wilson',
    role: 'Founder of Initech',
    quote:
      'Session Buddy has transformed the way I manage my online sessions. Its intuitive interface and powerful features have made scheduling and organizing sessions a breeze. Highly recommended!',
    image: davidWilsonImage.src,
  },
  {
    name: 'Sarah Lee',
    role: 'Founder',
    company: 'Initech',
    quote:
      'As a team leader, Session Buddy has been an invaluable tool for coordinating our remote sessions. The seamless integration with our calendars and communication platforms has improved our productivity and collaboration significantly.',
  },
  {
    name: 'Michael Chen',
    quote:
      "I can't imagine going back to my old session management methods after using Session Buddy. The convenience of having all my sessions organized in one place, along with the smart reminders, has made a huge difference in my daily workflow.",
  },
] as const satisfies Testimonial[];
