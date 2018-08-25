import { browser, by, element } from 'protractor';
import { Hero } from 'classHero';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }


  addToHeroName(text: string): promise.Promise<void> {
    let input = element(by.css('input'));
    return input.sendKeys(text);
  }

  expectHeading(hLevel: number, expectedText: string): void {
      let hTag = `h${hLevel}`;
      let hText = element(by.css(hTag)).getText();
      expect(hText).toEqual(expectedText, hTag);
  };

  getHeroAEltById(id: number): ElementFinder {
    let spanForId = element(by.cssContainingText('li span.badge', id.toString()));
    return spanForId.element(by.xpath('..'));
  }

  getHeroLiEltById(id: number): ElementFinder {
    let spanForId = element(by.cssContainingText('li span.badge', id.toString()));
    return spanForId.element(by.xpath('../..'));
  }

  async function toHeroArray(allHeroes: ElementArrayFinder): Promise<Hero[]> {
    let promisedHeroes = await allHeroes.map(Hero.fromLi);
    // The cast is necessary to get around issuing with the signature of Promise.all()
    return <Promise<any>> Promise.all(promisedHeroes);
  }
}

class Hero {
  id: number;
  name: string;

  // Factory methods

  // Hero from string formatted as '<id> <name>'.
  static fromString(s: string): Hero {
    return {
      id: +s.substr(0, s.indexOf(' ')),
      name: s.substr(s.indexOf(' ') + 1),
    };
  }

  // Hero from hero list <li> element.
  static async fromLi(li: ElementFinder): Promise<Hero> {
      let stringsFromA = await li.all(by.css('a')).getText();
      let strings = stringsFromA[0].split(' ');
      return { id: +strings[0], name: strings[1] };
  }

  // Hero id and name from the given detail element.
  static async fromDetail(detail: ElementFinder): Promise<Hero> {
    // Get hero id from the first <div>
    let _id = await detail.all(by.css('div')).first().getText();
    // Get name from the h2
    let _name = await detail.element(by.css('h2')).getText();
    return {
        id: +_id.substr(_id.indexOf(' ') + 1),
        name: _name.substr(0, _name.lastIndexOf(' '))
    };
  }
}
