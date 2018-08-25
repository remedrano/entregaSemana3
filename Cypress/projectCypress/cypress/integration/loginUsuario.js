describe('Los estudiantes login', function() {
    it('Visitar a los estudiantes y hacer login correcto', function() {
      cy.visit('https://losestudiantes.co')
      cy.contains('Cerrar').click()
      
      cy.contains('Ingresar').click()
      cy.get('.cajaLogIn').find('input[name="correo"]').click().type("re.medrano@uniandes.edu.co")
      cy.get('.cajaLogIn').find('input[name="password"]').click().type("12345678")
      cy.get('.cajaLogIn').contains('Ingresar').click()
    
    })
})
