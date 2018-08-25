var assert = require('assert');
describe('los estudiantes login', function() {
    it('should visit los estudiantes and failed at log in', function () {
		
		
        browser.url('https://losestudiantes.co');
        browser.click('button=Cerrar');				
        browser.waitForVisible('button=Ingresar', 5000);
        browser.click('button=Ingresar');
		
		//Buscar profesor
		browser.waitForVisible('.Select-control', 5000);
        var selector = browser.element('.Select-control');
	
        selector.click();
		selector.keys('Dario Correal');   
	
		
    });
});