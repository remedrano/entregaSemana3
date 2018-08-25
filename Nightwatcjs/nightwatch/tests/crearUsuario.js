module.exports = { // adapted from: https://git.io/vodU0
  'Los estudiantes login falied': function(browser) {
	  	  
    browser
	  .url('https://losestudiantes.co/')
      .click('.botonCerrar')
      .waitForElementVisible('.botonIngresar', 4000)
      .click('.botonIngresar')	  
      .setValue('.cajaSignUp input[name="nombre"]', 'Rafael')
	  .setValue('.cajaSignUp input[name="apellido"]', 'Medrano')
	  .setValue('.cajaSignUp input[name="correo"]', 're.medrano@uniandes.edu.co')
	  .setValue('.cajaSignUp select[name="idUniversidad"]', 'universidad-de-los-andes')
	  .setValue('.cajaSignUp select[name="idUniversidad"]', 'universidad-de-los-andes');
	  browser.expect.element('input[class="jsx-527058112"]').to.be.selected;
	  browser.expect.element('input[class="jsx-527058112"]').to.be.selected;		  
      browser.setValue('.cajaLogIn input[name="password"]', '1234')
	  browser.expect.element('input[class="jsx-527058112"]').to.be.selected;
      browser.click('.cajaSignUp .logInButton');
	  
	  browser.expect.element('.logInButton').click();	
      .end();
  }
};
