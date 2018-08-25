'use strict'; // necessary for es6 output in node

import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { promise } from 'selenium-webdriver';

const expectedH1 = 'Tour of Heroes';
const expectedTitle = `${expectedH1}`;
const targetHero = { id: 12, name: 'Narco' };
const targetHeroDashboardIndex = 0;
const nameSuffix = 'Z';
const newHeroName = targetHero.name + nameSuffix;

function getElementosPagina() {
    let navElts = element.all(by.css('app-root nav a'));

    return {
      navElts: navElts,
      appDashboardHref: navElts.get(0),
      appDashboard: element(by.css('app-root app-dashboard')),
      topHeroes: element.all(by.css('app-root app-dashboard > div h4')),
      appHeroesHref: navElts.get(1),
      appHeroes: element(by.css('app-root app-heroes')),
      allHeroes: element.all(by.css('app-root app-heroes li')),
      selectedHeroSubview: element(by.css('app-root app-heroes > div:last-child')),
      heroDetail: element(by.css('app-root app-hero-detail > div')),
      searchBox: element(by.css('#search-box')),
      searchResults: element.all(by.css('.search-result li'))
    };
  }

  //Busqueda del heroe
  describe('Busqueda de heroe', () => {

     beforeAll(() => browser.get(''));

     it(`Buqueda para 'Na'`, async () => {
       getElementosPagina().searchBox.sendKeys('Na');
       browser.sleep(1000);
       expect(getElementosPagina().searchResults.count()).toBe(3);
     });

     it(`continuar buscando con 'r'`, async () => {
       getElementosPagina().searchBox.sendKeys('r');
       browser.sleep(1000);
       expect(getElementosPagina().searchResults.count()).toBe(1);
     });

     it(`continuar buscando con 'c' y el nombre ${targetHero.name}`, async () => {
       getElementosPagina().searchBox.sendKeys('c');
       browser.sleep(1000);
       let page = getElementosPagina();
       expect(page.searchResults.count()).toBe(1);
       let hero = page.searchResults.get(0);
       expect(hero.getText()).toEqual(targetHero.name);
     });

     it(`Ir al detalle del heroe  ${targetHero.name} `, async () => {
       let hero = getElementosPagina().searchResults.get(0);
       expect(hero.getText()).toEqual(targetHero.name);
       hero.click();

       let page = getElementosPagina();
       expect(page.heroDetail.isPresent()).toBeTruthy('shows hero detail');
       let hero2 = await Hero.fromDetail(page.heroDetail);
       expect(hero2.id).toEqual(targetHero.id);
       expect(hero2.name).toEqual(targetHero.name.toUpperCase());
     });
  });

   describe('Actualizar un heroe ', () => {

     it('Cambiar a la opcion de listado de heroes', () => {
        getElementosPagina().appHeroesHref.click();
        let page = getElementosPagina();
        expect(page.appHeroes.isPresent()).toBeTruthy();
        expect(page.allHeroes.count()).toEqual(10, 'number of heroes');
      });

      it('Ver los detalles de un heroe', async () => {
        getHeroLiEltById(targetHero.id).click();

        let page = getElementosPagina();
        expect(page.heroDetail.isPresent()).toBeTruthy('shows hero detail');
        let hero = await Hero.fromDetail(page.heroDetail);
        expect(hero.id).toEqual(targetHero.id);
        expect(hero.name).toEqual(targetHero.name.toUpperCase());
      });

     it(`Actualizar informacion heroe -Narco- en la vista de detalle`, async () => {
       addToHeroName(nameSuffix);
      let page = getElementosPagina();
      let hero = await Hero.fromDetail(page.heroDetail);
      expect(hero.id).toEqual(targetHero.id);
      expect(hero.name).toEqual(newHeroName.toUpperCase());
     } );
   });

     describe('Navegar a detalles de un hereo desde el dashboard', () => {
       beforeAll(() => browser.get(''));
         it('revisar el dashboard', () => {
           let page = getElementosPagina();
           expect(page.topHeroes.count()).toEqual(4);
         });

         it(`Seleccionar y dirigir a los detalles del heroe ${targetHero.name} `, async () => {
            let targetHeroElt = getElementosPagina().topHeroes.get(targetHeroDashboardIndex);
            expect(targetHeroElt.getText()).toEqual(targetHero.name);
            targetHeroElt.click();
            browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

            let page = getElementosPagina();
            expect(page.heroDetail.isPresent()).toBeTruthy('shows hero detail');
            let hero = await Hero.fromDetail(page.heroDetail);
            expect(hero.id).toEqual(targetHero.id);
            expect(hero.name).toEqual(targetHero.name.toUpperCase());

         });
     });

     describe('Navegar a detalles de un hereo desde el listado de heroes', () => {
       beforeAll(() => browser.get(''));

       it('Cambiar a la opcion de listado de heroes', () => {
          getElementosPagina().appHeroesHref.click();
          let page = getElementosPagina();
          expect(page.appHeroes.isPresent()).toBeTruthy();
          expect(page.allHeroes.count()).toEqual(10, 'number of heroes');
        });

        it('Ver los detalles de un heroe', async () => {
          getHeroLiEltById(targetHero.id).click();

          let page = getElementosPagina();
          expect(page.heroDetail.isPresent()).toBeTruthy('shows hero detail');
          let hero = await Hero.fromDetail(page.heroDetail);
          expect(hero.id).toEqual(targetHero.id);
          expect(hero.name).toEqual(targetHero.name.toUpperCase());
        });

     });

     describe('Navegar a detalles de un hereo desde la busqueda', () => {
       beforeAll(() => browser.get(''));

       it(`Buqueda para 'Na'`, async () => {
         getElementosPagina().searchBox.sendKeys('Na');
         browser.sleep(1000);
         expect(getElementosPagina().searchResults.count()).toBe(3);
       });

       it(`continuar buscando con 'r'`, async () => {
         getElementosPagina().searchBox.sendKeys('r');
         browser.sleep(1000);
         expect(getElementosPagina().searchResults.count()).toBe(1);
       });

       it(`continuar buscando con 'c' y el nombre ${targetHero.name}`, async () => {
         getElementosPagina().searchBox.sendKeys('c');
         browser.sleep(1000);
         let page = getElementosPagina();
         expect(page.searchResults.count()).toBe(1);
         let hero = page.searchResults.get(0);
         expect(hero.getText()).toEqual(targetHero.name);
       });

       it(`Ir al detalle del heroe  ${targetHero.name} `, async () => {
         let hero = getElementosPagina().searchResults.get(0);
         expect(hero.getText()).toEqual(targetHero.name);
         hero.click();

         let page = getElementosPagina();
         expect(page.heroDetail.isPresent()).toBeTruthy('shows hero detail');
         let hero2 = await Hero.fromDetail(page.heroDetail);
         expect(hero2.id).toEqual(targetHero.id);
         expect(hero2.name).toEqual(targetHero.name.toUpperCase());
       });

       });

     describe('Eliminar heroe', () => {
       beforeAll(() => browser.get(''));

       it('Cambiar a la opcion de listado de heroes', () => {
          getElementosPagina().appHeroesHref.click();
          let page = getElementosPagina();
          expect(page.appHeroes.isPresent()).toBeTruthy();
          expect(page.allHeroes.count()).toEqual(10, 'number of heroes');
        });

       it(`Eliminar -Narco- de la lista de heroes`, async () => {
         const heroesBefore = await toHeroArray(getElementosPagina().allHeroes);
         const li = getHeroLiEltById(targetHero.id);
         li.element(by.buttonText('x')).click();

         const page = getElementosPagina();
         expect(page.appHeroes.isPresent()).toBeTruthy();
         expect(page.allHeroes.count()).toEqual(9, 'number of heroes');
         const heroesAfter = await toHeroArray(page.allHeroes);
         const expectedHeroes =  heroesBefore.filter(h => h.name !== 'Narco');
         expect(heroesAfter).toEqual(expectedHeroes);
       });


 });


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

async function toHeroArray(allHeroes: ElementArrayFinder): Promise<Hero[]> {
  let promisedHeroes = await allHeroes.map(Hero.fromLi);
  // The cast is necessary to get around issuing with the signature of Promise.all()
  return <Promise<any>> Promise.all(promisedHeroes);
}

function getHeroLiEltById(id: number): ElementFinder {
  let spanForId = element(by.cssContainingText('li span.badge', id.toString()));
  return spanForId.element(by.xpath('../..'));
}
function addToHeroName(text: string): promise.Promise<void> {
  let input = element(by.css('input'));
  return input.sendKeys(text);
}
