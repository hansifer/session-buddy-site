import type { Testimonial } from '@/types';

import harryNewton from '@/assets/profile-images/harry-newton.jpg';
import hubertusKeil from '@/assets/profile-images/hubertus-keil.jpg';
import robertGasparotto from '@/assets/profile-images/robert-gasparotto.jpg';
import deitrichArmanteLowrance from '@/assets/profile-images/deitrich-armante-lowrance.png';
import drieschDeNoronha from '@/assets/profile-images/driesch-de-noronha.jpg';
import kenWu from '@/assets/profile-images/ken-wu.png';
import jonE from '@/assets/profile-images/jon-e.jpg';
import mohamedHasaan from '@/assets/profile-images/mohamed-hasaan.png';
import anderWriter from '@/assets/profile-images/anderwriter.jpg';
import maxButler from '@/assets/profile-images/max-butler.png';
import barryGrau from '@/assets/profile-images/barry-grau.png';
import dylanDevens from '@/assets/profile-images/dylan-devens.png';
import warrenShigoli from '@/assets/profile-images/warren-shigoli.png';
import cR from '@/assets/profile-images/c-r.jpg';
import reinoReent from '@/assets/profile-images/reino-reent.png';
import joeBtfsplk from '@/assets/profile-images/joe-btfsplk.jpg';
import vítPokorný from '@/assets/profile-images/vít-pokorný.jpg';
import markMcCormick from '@/assets/profile-images/mark-mccormick.png';
import lovelyMangla from '@/assets/profile-images/lovely-mangla.jpg';
import jugalJadhav from '@/assets/profile-images/jugal-jadhav.jpg';
import ronalAbraham from '@/assets/profile-images/ronal-abraham.png';
import jeffSchaefer from '@/assets/profile-images/jeff-schaefer.jpg';
import valters from '@/assets/profile-images/valters.png';
import nikhilKundra from '@/assets/profile-images/nikhil-kundra.png';
import johnToumpis from '@/assets/profile-images/john-toumpis.jpg';
import jordanRoberts from '@/assets/profile-images/jordan-roberts.png';
import ryanFerguson from '@/assets/profile-images/ryan-ferguson.jpg';
import knightMayne from '@/assets/profile-images/knight-mayne.jpg';
import grantMiller from '@/assets/profile-images/grant-miller.jpg';
import anon from '@/assets/profile-images/anon.jpg';
import nicoleWest from '@/assets/profile-images/nicole-west.png';

export const testimonials = [
  {
    name: 'Harry Newton',
    image: harryNewton.src,
    quote:
      "This is the greatest extension to Google Chrome. I use it several times a day. Every day. I can give you a thousand reasons to love it. Better, download it and use it. You'll see why I love it.",
  },
  {
    name: 'Hubertus Keil',
    image: hubertusKeil.src,
    quote:
      'Session Buddy is fantastic, super-simple to use and a big time saver for me.',
  },
  {
    name: 'Robert Gasparotto',
    image: robertGasparotto.src,
    quote: 'Awesome - I use it every day.',
  },
  {
    name: 'Deitrich Armante Lowrance',
    image: deitrichArmanteLowrance.src,
    quote:
      'Really saves my bacon whenever Brave decides to crash and take my 30+ active tabs with it, unable to be recovered by Brave itself. Cannot recommend this extension enough!',
  },
  {
    name: 'Anonymous backer',
    quote: 'Your extension has saved my bacon more times than I can remember.',
  },
  {
    name: 'Andreas T (backer)',
    quote:
      "I very much love Session Buddy and depend on it many times per day. I'm a CTO, and I appreciate what you've built, the functionality/design choices you've made, and the need you're filling! [Session Buddy] and a few others are my absolute must-install on any browser.",
  },
  {
    name: 'Anonymous backer',
    quote: 'BY FAR the best browser extension I have ever come across.',
  },
  {
    name: 'Adam (backer)',
    quote:
      'My work is very project based and this app is a lifesaver when switching between projects without having to keep loads of browser windows open.',
  },
  {
    name: 'Bernhard Kau (backer)',
    quote:
      "One of the extensions I couldn't work without as a power user. Keep up the great power!",
  },
  {
    name: 'Daniel Vichman (backer)',
    quote:
      'A bunch of times I got into saying "where are all my tabs?!" and have your extension come to the rescue. Thank you!',
  },
  {
    name: 'Nanosawa (backer)',
    quote:
      'Thanks to Session Buddy, I was able to restore my closed incognito window. Thank you!',
  },
  {
    name: 'Joël Azemar (backer)',
    quote:
      "I always go back to Session Buddy and use it like a menu or a map for all the windows and tabs I have open, which helps reduce duplication. When I need to restart, it helps me get back to where I was. I couldn't imagine not having it.",
  },
  {
    name: 'Jimmy Chu (backer)',
    quote:
      'Thank you for making this useful chrome extension! It make saving and loading group of tabs and their management a lot easier!',
  },
  {
    name: 'Anonymous backer',
    quote:
      'You saved my workflow both in personal life and in more serious stuff so much times!!',
  },
  {
    name: 'Hamzah (backer)',
    quote: 'Awesome extension :) Been using it for a long time.',
  },
  {
    name: 'Anonymous backer',
    quote:
      "Been using this product for years as an Account Manager - as someone who runs high volume meetings with about 70 clients, it's a very helpful tool.",
  },
  {
    name: 'Anonymous backer',
    quote:
      'Thank you for this wonderfully helpful extension. It has saved me time and time again.',
  },
  {
    name: 'Anonymous backer',
    quote:
      "Been using this amazingly useful extension for a long time and it's invaluable.",
  },
  {
    name: 'Yu-Hsiang Liu (backer)',
    quote:
      'Its interface is clean, easy to understand, and very user-friendly. Thank you very much. You’ve saved me a great deal of precious time.',
  },
  {
    name: 'Anonymous backer',
    quote: 'Best extension of its kind. Getting better with every update.',
  },
  {
    name: 'Jonty Wareing (backer)',
    quote:
      "This extension has been a lifesaver for my tab-habit for so long I don't know how I would live without it. Thank you!",
  },
  {
    name: 'Jordan Roberts',
    image: jordanRoberts.src,
    quote:
      'One of the goat extensions. Never buggy, easy to use, tons of functionality, great UI, constant updates. All around great extension.',
  },
  {
    name: 'Nikhil Kundra',
    image: nikhilKundra.src,
    quote:
      'Best damn tab organizer out there. Fast, intuitive, lightweight. An absolute life-saver.',
  },
  {
    name: 'Driesch De Noronha',
    image: drieschDeNoronha.src,
    // role: 'Founder of Initech',
    quote:
      'This is an example of an app that just works! Honestly mate, the design and interface are so intuitive and simple to use, I love it.',
  },
  {
    name: 'Ken Wu',
    image: kenWu.src,
    // role: 'Founder',
    // company: 'Initech',
    quote:
      "As someone who's prone to accumulating way too many tabs, this extension is a godsend.",
  },
  {
    name: 'Jon E',
    image: jonE.src,
    quote:
      "The best bookmark manager out there ... the only one that doesn't violate your privacy or sell your data, and offers the most complete functionality.",
  },
  {
    name: 'Mohamed Hasaan',
    image: mohamedHasaan.src,
    quote: 'The greatest bookmark manager out there!',
  },
  {
    name: 'AnderWriter',
    image: anderWriter.src,
    quote:
      "I think this add-on is excellently written. I've switched to it from my other long-time tab manager.",
  },
  {
    name: 'Max Butler',
    image: maxButler.src,
    quote:
      'An absolute must have for any browser. Incredibly easy to use and it is so much better than just using bookmarks and tab/window management.',
  },
  {
    name: 'Barry Grau',
    image: barryGrau.src,
    quote: 'I love this app!',
  },
  {
    name: 'Dylan Devens',
    image: dylanDevens.src,
    quote:
      'Should be default on chrome, able to restore sessions that would otherwise be lost.',
  },
  {
    name: 'Warren Shigoli',
    image: warrenShigoli.src,
    quote: 'The best thing on chrome!',
  },
  {
    name: 'C R',
    image: cR.src,
    quote:
      "Awesome little tool; it's one of those things one thinks should be an integral part of any browser.",
  },
  {
    name: 'Reino Reent',
    image: reinoReent.src,
    quote:
      'I’ve been using Session Buddy for at least five years and it’s one of the best and most useful extensions out there. I honestly couldn’t live without it.',
  },
  {
    name: 'Joe Btfsplk',
    image: joeBtfsplk.src,
    quote:
      "I've used Session Buddy since forever. It never ever lets me down. This is such a reliable tool. Love it.",
  },
  {
    name: 'Vít Pokorný',
    image: vítPokorný.src,
    quote:
      'Absolutely useful, I am using it for several years now, it works, it is simple and elegant. Thx.',
  },
  {
    name: 'Mark McCormick',
    image: markMcCormick.src,
    quote:
      'Great extension, and exactly what I was looking for. Session buddy will store all the open tabs so they can be restored after a shutdown when Chrome forgets them.',
  },
  {
    name: 'Lovely Mangla',
    image: lovelyMangla.src,
    quote:
      'This extension makes managing dozens of tabs so much easier. I can save groups, search through them quickly, and free up memory in just a click.',
  },
  {
    name: 'Jugal Jadhav',
    image: jugalJadhav.src,
    quote:
      'Session Buddy has saved me countless times by restoring tabs after a crash. I also love how I can neatly organize sessions for later without cluttering my browser.',
  },
  {
    name: 'Ronal Abraham',
    image: ronalAbraham.src,
    quote:
      'Ever feel guilty about closing unread tabs? Want to keep those tabs around forever? Then this is the extension for you! I love it.',
  },
  {
    name: 'Jeff Schaefer',
    image: jeffSchaefer.src,
    quote:
      "One of the best extensions for chrome of all time and I'm talking top 10.",
  },
  {
    name: 'Valters',
    image: valters.src,
    quote:
      'Had alot of pinned tabs and lost all of them ... Opened [Session Buddy] and boom - one click and it was all back!',
  },
  {
    name: 'John Toumpis',
    image: johnToumpis.src,
    quote:
      "This extension saved me from disaster! It restored 70 tabs from a Chrome window I thought I'd lost forever.",
  },
  {
    name: 'Ryan Ferguson',
    image: ryanFerguson.src,
    quote:
      'Fantastic tool, I use for everyday work and even on my personal Chrome browser. LOVE IT!',
  },
  {
    name: 'Knight Mayne',
    image: knightMayne.src,
    quote:
      'I seriously cannot stress how much I love this extension. It has saved my history more times than I can count. Highly recommended.',
  },
  {
    name: 'Grant Miller',
    image: grantMiller.src,
    quote:
      'Easily my favorite Chrome plugin, the history feature, saving just certain windows, it does everything.',
  },
  {
    name: 'Anon',
    image: anon.src,
    quote:
      'No substance could ever hit me with that much dopamine as when i discovered that past me had installed session buddy and it saved all my tabs.',
  },
  {
    name: 'Nicole West',
    image: nicoleWest.src,
    quote:
      "I'm so glad this exists. I love my tabs, but until now, they have never loved me back <3",
  },
] as const satisfies Testimonial[];
