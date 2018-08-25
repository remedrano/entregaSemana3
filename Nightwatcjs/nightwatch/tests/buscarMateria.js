module.exports = { // adapted from: https://git.io/vodU0
  'Los estudiantes login falied': function(browser) {
    browser
      .url('https://losestudiantes.co/')
      .click('.botonCerrar')
      .waitForElementVisible('.Select-control', 4000)
      .click('.Select-control')
      .setValue('.Select-control', 'Dario Correal');
	  browser.waitForElementVisible('input[name="id:ISIS1206"]', 3000);
	  
      browser.expect.element('input[name="id:ISIS1206"]').to.be.selected;
browser.expect.element('input[name="id:ISIS1206L"]').to.be.selected;
      browser.end();
	  

  }
};
